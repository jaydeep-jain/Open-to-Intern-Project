
// this is validation page

// for sort name
const sortName=function(sortName){
  if(/^([A-Za-z]{2,10})+$/.test(sortName)) return true
  return false
}
// for personName
const personName=function(name){
  if(/^[A-Za-z, ]{8,80}$/.test(name)) return true
  return false
}

// for mobile number
const mobile=function(mobile){
  if(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(mobile)) return true
  return false
}

// for email id
const email=function(email){
    if(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email) ) return true
    return false
  }

  // for body
const body = function (data) {
    return Object.keys(data).length > 0;
  }

  // for link
const link=function(logolink){
  if(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(logolink)) return true
  return false
}


  module.exports.isValid={body,link,sortName,personName,mobile,email}