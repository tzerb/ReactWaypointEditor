
import $ from 'jquery';
export default class ApiHelpers {

	static formatErrorMessage(jqXHR, exception) {
        //http://stackoverflow.com/questions/377644/jquery-ajax-error-handling-show-custom-exception-messages
        if (jqXHR.status === 0) {
            return ('Not connected.\nPlease verify your network connection.');
        } else if (jqXHR.status == 404) {
            return ('The requested page not found. [404]');
        } else if (jqXHR.status == 500) {
            let jsonValue = $.parseJSON( jqXHR.responseText );
            return ('Internal Server Error [500].\r\n' + (jsonValue && jsonValue.exceptionMessage) ? jsonValue.exceptionMessage : "");
        } else if (exception === 'parsererror') {
            return ('Requested JSON parse failed.');
        } else if (exception === 'timeout') {
            return ('Time out error.');
        } else if (exception === 'abort') {
            return ('Ajax request aborted.');
        } else {
            return ('Uncaught Error.\n' + jqXHR.responseText);
        }
    }
}