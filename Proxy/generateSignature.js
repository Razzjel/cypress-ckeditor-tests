const crypto = require( 'crypto' );

function generateSignature( apiSecret, method, uri, timestamp, body ) {
	const url = new URL( uri );
	const path = url.pathname + url.search;

	const hmac = crypto.createHmac( 'SHA256', apiSecret );

	hmac.update( `${ method.toUpperCase() }${ path }${ timestamp }` );

	if ( body ) {
		hmac.update( Buffer.from( JSON.stringify( body ) ) );
	}

	return hmac.digest( 'hex' );
}

module.exports = generateSignature;