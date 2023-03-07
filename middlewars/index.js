const {authMwr} = require('./authMwr');
const {
    addPostValidationMwr,
    updatePostValidationMwr,
    updateFavoriteValidationMwr,
} = require('./postsValitationMwr');
const {uploadAvatarMwr} = require('./uploadAvatarMwr');
const {authUserValidationMwr} = require('./usersValidationMwr');

module.exports = {
    authMwr,
    addPostValidationMwr,
    updatePostValidationMwr,
    updateFavoriteValidationMwr,
    uploadAvatarMwr,
    authUserValidationMwr,
}