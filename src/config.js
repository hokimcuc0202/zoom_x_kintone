const config = {
    postMeetingUrl: 'https://api.zoom.us/v2/users/userId/meetings',
    tokenUrl: 'https://zoom.us/oauth/token?grant_type=authorization_code&code=${oauthCode}&redirect_uri=https%3A%2F%2Fsdd-demo.cybozu.com%2Fk%2F445%2F',
    getUserUrl: 'https://api.zoom.us/v2/users',
    clientId: '',
    clientSecret: ''
}
module.exports = config;