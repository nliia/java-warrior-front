const path = require("path"),
	_ = require("lodash");

const environments = {
	development: require(path.resolve(`${__dirname}/webpack/dev.js`)),
	prod: require(path.resolve(`${__dirname}/webpack/prod.js`)),
	test: require(path.resolve(`${__dirname}/webpack/test.js`)),
	common: require(path.resolve(`${__dirname}/webpack/common.js`))
};

function mergingRules (obj, src) {
	if (_.isArray(obj)) {
		return obj.concat(src);
	}
}

function getConfig(env) {
	if (environments[env] == null) throw new Error(`Окружение "${env}" не определено`);
	return _.mergeWith(environments.common(env), environments[env], mergingRules);
}

module.exports = env => getConfig(process.env.NODE_ENV || env.NODE_ENV);
