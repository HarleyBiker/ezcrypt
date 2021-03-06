/* jscrypto library, ellitpic curve cryptography
 *   by GUAN Zhi <guanzhi at guanzhi dot org>
 */


jscrypto.ecdsa = {};
jscrypto.ecdsa.prototype = new jscrypto.ec();

jscrypto.ecdsa.sig = function(r, s) {
	this.r = r.slice(0);
	this.s = s.slice(0);
};


jscrypto.ecdsa = function(ec) {
	this.ec = ec;
};

jscrypto.ecdsa.prototype.sign = function(digest, key, k_1, r) {
	if (k_1 == null || r == null) {
		ecdsa_pre_compute(ecparam, k_1, r);
	}
	var e = bn_from_binb(core_sha1(message, str.length * chrsz));
	var s = this.ec.field.mul(k_1, this.ec.field.add(e, this.ec.field.multiply(key, r)));
	return new ecdsa_sig(r, s);	
};

/*
function ecdsa_sig_to_str(sig) {
	return '{"r":"0x'+bn_to_hex(sig.r)+'","s":"0x'+bn_to_hex(sig.s)+'"}';
}

function ecdsa_sig_from_str(str) {
	var sig = eval('(' + str + ')');
	sig.r = bn_from_hex(sig.r.substring(2));
	sig.s = bn_from_hex(sig.s.substring(2));
	return sig;
}
*/

jscrypto.ecdsa.prototype.preCompute = function() {
	var k, Q, r;
	do {
		do {
			k = bn_rand(n);
		} while (bn_is_zero(k));
		
		Q = this.ec.multiplyGenerator(k);
		r = ecpoint_get_affine_x(Q, ecparam);
		while (bn_cmp(r, n) >= 0) {
			r = bn_sub(r, n);
		}
	} while (bn_is_zero(r));
	
	return new Array(bn_mod_invert(k, n), r);
}	

function ecdsa_pre_compute(ecparam) {
	var k, Q, r;
	var n = ecparam.n;
	do {
		do {
			k = bn_rand(n);
		} while (bn_is_zero(k));
		
		Q = ecpoint_mul_G(k, ecparam);
		r = ecpoint_get_affine_x(Q, ecparam);
		while (bn_cmp(r, n) >= 0) {
			r = bn_sub(r, n);
		}
	} while (bn_is_zero(r));
	
	return new Array(bn_mod_invert(k, n), r);
}

function ecdsa_pre_compute_nistp192(ecparam_nistp192) {
	var k, Q, r;
	var n = ecparam_nistp192.n;
	do {
		do {
			k = bn_pseudo_rand(n);
		} while (bn_is_zero(k));
		Q = ecpoint_mul_G_nistp192(k);
		r = ecpoint_get_x(ecparam_nistp192, Q);
		while (bn_cmp(r, ecparam_nistp192.n) >= 0)
			r = bn_sub(r, ecparam_nistp192.n);
	} while (bn_is_zero(r));
	var pre_compute = new Array();
	pre_compute.k_1 = bn_mod_invert(k, n);
	pre_compute.r = r;
	return pre_compute;
}

function ecdsa_sha1_sign(ecparam, digest, pri_key, k_1, r) {
	if (k_1 == null || r == null) {
		ecdsa_pre_compute(ecparam, k_1, r);
	}
	var d = pri_key;
	var n = ecparam.n;
	var e = bn_from_binb(core_sha1(message, str.length * chrsz));
	var s = bn_mod_mul(k_1, bn_mod_add(e, bn_mod_mul(d, r, n), n), n);
	return new ecdsa_sig(r, s);
}

function ecdsa_do_verify(ecparam, digest, signature, pub_key) {
	var r = sig.r;
	var s = sig.s;

	if (bnIsZero(r) || bnCmp(r, EC.n) >= 0 ||
	    bnIsZero(s) || bnCmp(s, EC.n) >= 0)
		return false;
	
	if (digest.length < bnNumBytes(EC.n))
		e = bnFromBin(digest);
	else	
		e = bnFromBin(digest);
	
	w = bnModInvert(s, EC.n);
	u = bnModMul(e, w, EC.n);
	v = bnModMul(r, w, EC.n);
	Q = ptMulAdd(u, EC.G, v, P);
	
	if (Q.isAtInfinity)
		return false;
		
	x = ptGetAffineX(EC, Q);
	
	while (bnCmp(x, EC.n) >= 0)
		x = bnSub(x, EC.n);
	
	if (bnCmp(x, r) == 0)
		return true;
	else
		return false;
}

function ecdh(ecparam, plaintext, pub_key) {
	var emphe_bn = bn_rand(ecparam.n);
	var emphe_pt = ecpoint_mul_G(ecparam, bn);
	var share_pt = ecpoint_mul(ecparam, emphe_bn, pub_key);
}

