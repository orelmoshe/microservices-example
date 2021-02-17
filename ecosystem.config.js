module.exports = {
	apps: [
		{
			name: 'server1',
			script: './server1/transpiled/index.js',
			watch: true,
			exec_mode: 'cluster_mode',
			instances: 1,
		},
		{
			name: 'server2',
			script: './server2/transpiled/index.js',
			watch: true,
			exec_mode: 'cluster_mode',
			instances: 1,
		},
		{
			name: 'apiGateway',
			script: './apiGateway/index.js',
			watch: true,
			exec_mode: 'cluster_mode',
			instances: 1,
		},
	],

	deploy: {
		production: {
			user: 'SSH_USERNAME',
			host: 'SSH_HOSTMACHINE',
			ref: 'origin/master',
			repo: 'GIT_REPOSITORY',
			path: 'DESTINATION_PATH',
			'pre-deploy-local': '',
			'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
			'pre-setup': '',
		},
	},
};
