const message = {
    ADMIN_CREDENTIAL_ERROR : "Error while inserting admin credential",
    ADMIN_LOGIN_ERROR : "invalid credentials",
    SOMETHING_WENT_WRONG : "Something went wrong",
    LOGIN_ISSUE : "please try after some time | authenticate token error",
    EVENT_ADDED : "Event added successfully",
    EVENT_NOT_ADDED : "Error While Adding Event",
    EVENT_LIST_ERROR : "Error while fecthing events list",
    EVENT_DELETED : "Event deleted successfully",
    EVENT_DELETED_ERROR : "Event deleted error",
    EVENT_UPDATED_SUCCESS : "Event updated successfully",
    MAIL_SENDING_ERROR  : "error while sending mail from mailer",
    ERROR_PROFILE_UPLOAD : 'error while uploading profile image',
    WAIT_FOR_ADMIN_APPROVAL : "Wait for admin approval till then we have send you mail click the link to verify yourself",
    ALUMNI_EMAIL_VERIFY_ERROR : "Alumni email verify error",
    ALUMNI_EMAIL_VERIFY_SUCCESS : "Alumni email verify success | wait for admin verification after 3 hour you can login",
    ALUMNI_VERIFY_SUCCESS : "Alumni Verified Successfully",
    ALUMNI_LOGIN_ERROR : "Invalid Creadential",
    ACCOUNT_DEACTIVATED : 'Account deactivated please contect your admin to activate'
}

const status = {
    SUCCESS : 200,
    ERROR : 500
}

module.exports = {message,status}