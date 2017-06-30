module.exports= {
  database:'mongodb://root:root@ds135552.mlab.com:35552/root',
  emailKey:'!@*#blabla#*@!',
  JWTkey:'!@*#123321#*@!',
  fbAppID: '136269600285050',
  fbAppSecret: 'e76e50d1dfdb06c9a216b0d9c11a52a0',
  fbcallbackURL: 'http://localhost:4000/api/regFbUser/user/fbcallback',
  profileFields: ['id', 'name', 'displayName', 'picture.type(large)', 'hometown', 'profileUrl', 'emails'],
}
