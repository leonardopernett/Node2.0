const {format} = require('timeago.js')

module.exports = {
    timeago : timestamps =>  format(timestamps) 
}