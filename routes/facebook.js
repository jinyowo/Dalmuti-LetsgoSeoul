/*
 * 데이터베이스 관련 객체들을 init() 메소드로 설정
 * 
 */
var config = require('../config');

var database;
var FacebookSchema;
var FacebookModel;

// 데이터베이스 객체, 스키마 객체, 모델 객체를 이 모듈에서 사용할 수 있도록 전달함
var init = function(db) {
	console.log('facebook  init 호출됨.');
	
	database = db;
	FacebookSchema = database[config.db_schemas[1].schemaName];
	FacebookModel = database[config.db_schemas[1].modelName];
}


var addlocation = function(req, res) {
	console.log('facebook 모듈 안에 있는 addLocation 호출됨.');
	
	var paramId = req.param('id');
	var paramCheckins = req.param('checkins');
	var paramName = req.param('name');
	
	if (database) {
		addLocation(database, paramId, paramCheckins, paramName, function(err, result) {
			if (err) {throw err;}
			
			if (result) {
				console.dir(result);
 
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>location 추가 성공</h2>');
				res.end();
			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>location 추가  실패</h2>');
				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};

var listlocation = function(req, res) {
	console.log('facebook 모듈 안에 있는 listlocation 호출됨.');
	
	if (database) {
		// 1. 모든 사용자 검색
		FacebookModel.findAll(function(err, results) {
			if (err) {
				callback(err, null);
				return;
			}
			  
			if (results) {
				console.dir(results);
				
				res.writeHead('200', {'Content-Type' : 'application/json; charset=utf8'});
				res.write(JSON.stringify(results));
				res.end();
			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>facebook 리스트 조회  실패</h2>');
				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};

//장소를 등록하는 함수
var addLocation = function(database, id, checkins, name, callback) {
	console.log('addLocation 호출됨.');
	
	// FacebookModel 인스턴스 생성
	var facebook = new FacebookModel({"id":id, "checkins":checkins, "name":name});

	// save()로 저장
	facebook.save(function(err) {
		if (err) {
			callback(err, null);
			return;
		}
		
	    console.log("장소 데이터 추가함.");
	    callback(null, facebook);
	     
	});
}


module.exports.init = init;
module.exports.addlocation = addlocation;
module.exports.listlocation = listlocation;

