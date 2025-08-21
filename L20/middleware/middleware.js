function m1(req, res, next) {
  console.log('m1');
  req.user = {
    id: 1,
    username: 'pranay'
  };
  next();
}

function m2(req, res, next) {
  console.log('m2');
  console.log(req.user);
  req.isAdmin = true;
  next();
}

function checkadmin(req, res, next) {
  console.log("checkadmin");
  let { name } = req.query;
  if (name == "pranay") {
    req.isAdmin = true;
    return next();
  }
  return res.json({
    success: false,
    message: "no access"
  });
}

function isLogin(req, res, next) {
  console.log("isLogin");
  next();
}

module.exports = { m1, m2, checkadmin, isLogin };
