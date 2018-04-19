const pp = require("project-paths"),
	_ = require("lodash");

const environments = {
	dev: require(pp.get("webpack", "dev.js")),
	prod: require(pp.get("webpack", "prod.js")),
	test: require(pp.get("webpack", "test.js")),
	common: require(pp.get("webpack", "common.js"))
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
