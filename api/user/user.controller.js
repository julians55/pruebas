const crypto = require('crypto');
const pool = require('../../config/database');
const bcrypt = require('bcrypt');
const { exec, spawn } = require('node:child_process');

const serialNumber = require('./xd');
const { stdout } = require('process');
const { Console } = require('console');




const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM public."user"');
    console.log(response.rows);
    res.send(response.rows);
    var fromCache = function (error, stdout) {
		fs.readFile(__dirname + '/cache', function (fsErr, data) {
			if (data) {data = data.toString().trim();}
			if (fsErr || !data || data.length < 2) {
				attemptEC2(function() {
					stdoutHandler(error, stdout, true);
				});
			} else {
				cb(null, data);
			}
		});
	};

	var stdoutHandler = function (error, stdout, bypassCache) {
		if (error && !bypassCache) {
			fromCache(error, stdout);
		} else {
			cb(error, parseResult(stdout));
		}
	};

	var parseResult = function (input) {
		var result = input.slice(input.indexOf(delimiter) + 2).trim();

		var isResultUseless = uselessSerials.some(function(val) {
			return val === result;
		});

		if (isResultUseless) {
			return '';
		}

		return result;
	};

	var attemptEC2 = function (failCb) {
		var data = '';
		var failHandler = function () {
			failCb();
			failCb = function () {};
		};
		var request = http.get(
			'http://169.254.169.254/latest/meta-data/instance-id',
			function (res) {
				res.on('data', function (chunk) {
					data += chunk;
				}).on('end', function () {
					if (data.length > 2) {
						cb(null, data.trim());
					} else {
						failHandler();
					}
				});
			}
		);
		request.on('error', failHandler).setTimeout(1000, failHandler);
	};
    exec('sudo dmidecode -t system | grep Serial', (error, stdout, stderr) => {
        
        exec('dmidecode -t system | grep UUID', console.log(stdout));
      });
    
}

const getUserById = async (req, res) => {
    const user = await pool.query('SELECT * FROM public."user" WHERE "email" = $1', [req.params.id]);
    res.send(user.rows);
}

const createUser = async (req, res)=>{
    const { name, password, email} = req.body;
    if (!name || !password || !email) {
      res.status(400).json({message: "Bad request"});
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = await pool.query(
        'INSERT INTO public."user" (name, balance, email, password) VALUES ($1,$2,$3,$4) RETURNING *',
        [req.body.name,0,req.body.email,hash]
    );
    res.send({user: newUser.rows[0]});
}

module.exports = {
    getUsers,
    getUserById,
    createUser
}