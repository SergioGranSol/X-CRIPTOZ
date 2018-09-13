
/* OpenPGP radix-64/base64 string encoding/decoding
 * Copyright 2005 Herbert Hanewinkel, www.haneWIN.de
 * version 1.0, check www.haneWIN.de for the latest version

 * This software is provided as-is, without express or implied warranty.  
 * Permission to use, copy, modify, distribute or sell this software, with or
 * without fee, for any purpose and by any individual or organization, is hereby
 * granted, provided that the above copyright notice and this paragraph appear 
 * in all copies. Distribution as a part of an application or binary must
 * include the above copyright notice in the documentation and/or other materials
 * provided with the application or distribution.
 */

var b64s='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

function s2r(t) {
    var a, c, n;
    var r='', l=0, s=0;
    var tl=t.length;

    for(n=0; n<tl; n++){
        c=t.charCodeAt(n);
        if(s == 0){
            r+=b64s.charAt((c>>2)&63);
            a=(c&3)<<4;
        } else if(s==1){
            r+=b64s.charAt((a|(c>>4)&15));
            a=(c&15)<<2;
        } else if(s==2){
            r+=b64s.charAt(a|((c>>6)&3));
            l+=1;
            if((l%60)==0) r+="\n";
            r+=b64s.charAt(c&63);
        }
        l+=1;
        if((l%60)==0) r+="\n";

        s+=1;
        if(s==3) s=0;  
    }
    if(s>0){
        r+=b64s.charAt(a);
        l+=1;
        if((l%60)==0) r+="\n";
        r+='=';
        l+=1;
    }
    if(s==1){
        if((l%60)==0) r+="\n";
        r+='=';
    }

    return r;
}

function r2s(t) {
    var c, n;
    var r='', s=0, a=0;
    var tl=t.length;

    for(n=0; n<tl; n++) {
        c=b64s.indexOf(t.charAt(n));
        if(c >= 0){
            if(s) r+=String.fromCharCode(a | (c>>(6-s))&255);
            s=(s+2)&7;
            a=(c<<s)&255;
        }
    }
    return r;
}


// **************************************************************************************************//


/*
 * conversion functions:
 * - num array to string
 * - string to hex
*/

function s2b(s) {
    var bn=1, r=[0], rn=0, sn=0, sb=256;
    var bits=s.length*8;

    for(var n=0; n<bits; n++) {
        if((sb<<=1) > 255) {
            sb=1;
            c=s.charCodeAt(sn++);
        }
        if(bn > bm) {
            bn=1;
            r[++rn]=0;
        }
        if(c & sb) r[rn]|=bn;
        bn<<=1;
    }
    return r;
}

function b2s(b) {
    var bn=1, bc=0, r=[0], rb=1, rn=0;
    var bits=b.length*bs;
    var n, rr='';

    for(n=0; n<bits; n++) {
        if(b[bc] & bn) r[rn]|=rb;
        if((rb<<=1) > 255) {
            rb=1; r[++rn]=0;
        }
        if((bn<<=1) > bm) {
            bn=1; bc++;
        }
    }

    while(rn >= 0 && r[rn]==0) rn--;
    for(n=0; n<=rn; n++) rr+=String.fromCharCode(r[n]);
    return rr;
}

function s2hex(s) {
    var result = '';
    for(var i=0; i<s.length; i++) {
        c = s.charCodeAt(i);
        result += ((c<16) ? "0" : "") + c.toString(16);
    }
    return result;
}

function hex2s(hex) {
    var r='';
    if(hex.indexOf("0x") == 0 || hex.indexOf("0X") == 0) hex = hex.substr(2);

    if(hex.length%2) hex+='0';

    for(var i = 0; i<hex.length; i += 2) r += String.fromCharCode(parseInt(hex.slice(i, i+2), 16));
    return r;
}


// **************************************************************************************************//


/* The following functions are (c) 2000 by John M Hanna and are
 * released under the terms of the Gnu Public License.
 * You must freely redistribute them with their source -- see the
 * GPL for details.
 *  -- Latest version found at http://sourceforge.net/projects/shop-js
 */

var rSeed=[], Rs=[];
var Sr, Rsl, Rbits, Rbits2;
var Rx=0, Ry=0;

// javascript's random 0 .. n
function r(n) {
    return Math.floor(Math.random()*n);
}

function ror(a,n){
    n&=7;
    return n?((a>>n)|((a<<(8-n))&255)):a;
}

// seed the random number generator with entropy in s
function seed(s) {
    var n=0,nn=0;
    var x, y, t;

    while(n < s.length){
        while(n<s.length && s.charCodeAt(n)<=32) n++;
        if(n < s.length) rSeed[nn]=parseInt("0x"+s.substr(n,2));
        n+=3; nn++;
    }

    Rsl=rSeed.length;
    Sr=r(256);
    Rbits=0;

    if(Rs.length==0){
        for(x=0; x<256; x++) Rs[x]=x;
    }
    y=0;
    for(x=0; x<256; x++) {
        y=(rSeed[x] + s[x] + y) % 256;
        t=s[x]; s[x]=s[y]; s[y]=t;
    }
    Rx=Ry=0;
    alert("Random seed updated. Seed size is: "+Rsl);
}

// generate a random number 0 .. 255 uses entropy from seed
function rc() {
    var t;
    // this first bit is basically RC4

    Rx=++Rx & 255;
    Ry=(Rs[Rx] + Ry) & 255;
    t=Rs[Rx]; Rs[Rx]=Rs[Ry]; Rs[Ry]=t;
    Sr^= Rs[(Rs[Rx] + Rs[Ry]) & 255];

    // xor with javascripts rand, just in case there's good entropy there
    Sr^= r(256);

    Sr^= ror(rSeed[r(Rsl)],r(8));
    Sr^= ror(rSeed[r(Rsl)],r(8));
    return Sr;
}

// random number between 0 .. n -- based on repeated calls to rc
function rand(n) {
    if(n==2) {
        if(!Rbits) {
            Rbits=8;
            Rbits2=rc(256);
        }
        Rbits--;
        var r=Rbits2 & 1;
        Rbits2>>=1;
        return r;
    }

    var m=1;

    r=0;
    while (n>m && m > 0) {
        m<<=8;
        r=(r<<8) |rc();
    }
    if(r<0) r ^= 0x80000000;
    return r % n;
}

// ------------------------------------------------------------
// functions for generating keys
// ------------------------------------------------------------

function beq(a,b) { // returns 1 if a == b
    if(a.length != b.length) return 0;

    for(var n=a.length-1; n>=0; n--) {
        if(a[n] != b[n]) return 0;
    }
    return 1;
}

function blshift(a,b) { // binary left shift b bits
    var n, c=0;
    var r=new Array(a.length);

    for(n=0; n<a.length; n++) {
        c|= (a[n]<<b);
        r[n]= c & bm;
        c>>=bs;
    }
    if(c) r[n]=c;
    return r;
}

function brshift(a) { // unsigned binary right shift 1 bit
    var c=0,n,cc;
    var r=new Array(a.length);

    for(n=a.length-1; n>=0; n--) {
        c<<=bs;
        cc=a[n];
        r[n]=(cc | c)>>1;
        c=cc & 1;
    }
    n=r.length;
    if(r[n-1]) return r;
    while(n > 1 && r[n-1]==0) n--;
    return r.slice(0,n);
}

function bgcd(uu,vv) { // return greatest common divisor
 // algorythm from http://algo.inria.fr/banderier/Seminar/Vallee/index.html

    var d, t, v=vv.concat(), u=uu.concat();
    for(;;) {
        d=bsub(v,u);
        if(beq(d,[0])) return u;
        if(d.length) {
            while((d[0] & 1) ==0) d=brshift(d); // v=(v-u)/2^val2(v-u)
            v=d;
        } else {
           t=v; v=u; u=t; // swap u and v
        }
    }
}

function rnum(bits) {
    var n,b=1,c=0;
    var a=[];
    if(bits==0) bits=1;
    for(n=bits; n>0; n--) {
        if(rand(2)) a[c]|=b;
        b<<=1;
        if(b==bx2) {
            b=1;
            c++;
        }
    }  
    return a;
}

var Primes=[3, 5, 7, 11, 13, 17, 19,
    23, 29, 31, 37, 41, 43, 47, 53,
    59, 61, 67, 71, 73, 79, 83, 89,
    97, 101, 103, 107, 109, 113, 127, 131,
    137, 139, 149, 151, 157, 163, 167, 173,
    179, 181, 191, 193, 197, 199, 211, 223,
    227, 229, 233, 239, 241, 251, 257, 263,
    269, 271, 277, 281, 283, 293, 307, 311,
    313, 317, 331, 337, 347, 349, 353, 359,
    367, 373, 379, 383, 389, 397, 401, 409,
    419, 421, 431, 433, 439, 443, 449, 457,
    461, 463, 467, 479, 487, 491, 499, 503,
    509, 521, 523, 541, 547, 557, 563, 569,
    571, 577, 587, 593, 599, 601, 607, 613,
    617, 619, 631, 641, 643, 647, 653, 659,
    661, 673, 677, 683, 691, 701, 709, 719,
    727, 733, 739, 743, 751, 757, 761, 769,
    773, 787, 797, 809, 811, 821, 823, 827,
    829, 839, 853, 857, 859, 863, 877, 881,
    883, 887, 907, 911, 919, 929, 937, 941,
    947, 953, 967, 971, 977, 983, 991, 997,
    1009, 1013, 1019, 1021];


var sieveSize=4000;
var sieve0=-1* sieveSize;
var sieve=[];
var lastPrime=0;

function nextPrime(p) { // returns the next prime > p
    var n;
    if(p == Primes[lastPrime] && lastPrime <Primes.length-1) {
        return Primes[++lastPrime];
    }
    if(p<Primes[Primes.length-1]) {
        for(n=Primes.length-2; n>0; n--) {
            if(Primes[n] <= p) {
                lastPrime=n+1;
                return Primes[n+1];
            }
        }
    }
    // use sieve and find the next one
    var pp,m;
    // start with p
    p++; if((p & 1)==0) p++;
    for(;;) {
        // new sieve if p is outside of this sieve's range
        if(p-sieve0 > sieveSize || p < sieve0) {
            // start new sieve
            for(n=sieveSize-1; n>=0; n--) sieve[n]=0;
            sieve0=p;
            primes=Primes.concat();
        }

        // next p if sieve hit
        if(sieve[p-sieve0]==0) {
            // sieve miss
            // update sieve if p divisable

            // find a prime divisor
            for(n=0; n<primes.length; n++) {
                if((pp=primes[n]) && p % pp ==0) {
                    for(m=p-sieve0; m<sieveSize; m+=pp) sieve[m]=pp;
                    p+=2;
                    primes[n]=0;
                    break;
                }
            }
            if(n >= primes.length) {
                // possible prime
                return p;
            }
        } else {
            p+=2;
        }
    }
}

function divisable(n,max) { // return a factor if n is divisable by a prime less than max, else return 0
    if((n[0] & 1) == 0) return 2;
    for(c=0; c<Primes.length; c++) {
        if(Primes[c] >= max) return 0;
        if(simplemod(n,Primes[c])==0) return Primes[c];
    }
    c=Primes[Primes.length-1];
    for(;;) {
        c=nextPrime(c);
        if(c >= max) return 0;
        if(simplemod(n,c)==0) return c;
    }
}

function bPowOf2(pow) { // return a bigint
    var r=[], n, m=Math.floor(pow/bs);
    for(n=m-1; n>=0; n--) r[n]=0;
    r[m]=1<<(pow % bs);
    return r;
}

function mpp(bits) { // returns a Maurer Provable Prime, see HAC chap 4 (c) CRC press
    if(bits < 10) return [Primes[rand(Primes.length)]];
    if(bits <=20) return [nextPrime(rand(1<<bits))];

    var c=10, m=20, B=bits*bits/c, r, q, I, R, n, a, b, d, R2, nMinus1;

    if(bits > m*2) {
        for(;;) {
            r=Math.pow(2,Math.random()-1);
            if(bits - r * bits > m) break;
        }
    } else {
        r=0.5
    }

    q=mpp(Math.floor(r*bits)+1);
    I=bPowOf2(bits-2);
    I=bdiv(I,q).q;
    Il=I.length;
    for(;;) {
        // generate R => I < R < 2I
        R=[];
        for(n=0; n<Il; n++) R[n]=rand(bx2);
        R[Il-1] %= I[Il-1];
        R=bmod(R,I);
        if(!R[0]) R[0]|=1; // must be greater or equal to 1
        R=badd(R,I);
        n=blshift(bmul(R,q),1); // 2Rq+1
        n[0]|=1;
        if(!divisable(n,B)) {
            a=rnum(bits-1);
            a[0]|=2; // must be greater than 2
            nMinus1=bsub(n,[1]);
            var x=bmodexp(a,nMinus1,n);
            if(beq(x,[1])) {
                R2=blshift(R,1);
                b=bsub(bmodexp(a,R2,n),[1]);
                d=bgcd(b,n);
                if(beq(d,[1])) return n;
            }
        }
    }
}

// -------------------------------------------------

function sub2(a,b) {
    var r=bsub(a,b);
    if(r.length==0) {
        this.a=bsub(b,a);
        this.sign=1;
    } else {
        this.a=r;
        this.sign=0;
    }
    return this;
}

function signedsub(a,b) {
    if(a.sign) {
        if(b.sign) return sub2(b,a);
        else {
            this.a=badd(a,b);
            this.sign=1;
        }
    } else {
        if(b.sign) {
            this.a=badd(a,b);
            this.sign=0;
        } else return sub2(a,b);
    }
    return this;
}

// from  Bryan Olson <bryanolson@my-deja.com> 

function modinverse(x,n) { // returns x^-1 mod n
    var y=n.concat(), t, r, bq, a=[1], b=[0], ts;

    a.sign=0; b.sign=0;

    while(y.length > 1 || y[0]) {
        t=y.concat();
        r=bdiv(x,y);
        y=r.mod;
        q=r.q;
        x=t;
        t=b.concat(); ts=b.sign;
        bq=bmul(b,q);
        bq.sign=b.sign;
        r=signedsub(a,bq);
        b=r.a; b.sign=r.sign;
        a=t; a.sign=ts;
    }

    if(x.length != 1 || x[0] != 1) return [0]; // No inverse; GCD is x

    if(a.sign) {
        a=bsub(n,a);
    }
    return a;
}

// -------------------------------------------------
// function to generate keys

var rsa_p,rsa_q,rsa_e,rsa_d,rsa_pq, rsa_u;

function rsaKeys(bits) {
    var c, p1q1;

    bits=parseInt(bits);
    rsa_q=mpp(bits);
    rsa_p=mpp(bits);
    p1q1=bmul(bsub(rsa_p,[1]),bsub(rsa_q,[1]));

    for(c=5; c<Primes.length; c++) {
        rsa_e=[Primes[c]];
        rsa_d=modinverse(rsa_e,p1q1);
        if(rsa_d.length != 1 || rsa_d[0]!=0) break;
    }
    rsa_pq=bmul(rsa_p,rsa_q);
    rsa_u=modinverse(rsa_p,rsa_q);

    return;
}


// **************************************************************************************************//


/* RSA public key encryption/decryption
 * The following functions are (c) 2000 by John M Hanna and are
 * released under the terms of the Gnu Public License.
 * You must freely redistribute them with their source -- see the
 * GPL for details.
 *  -- Latest version found at http://sourceforge.net/projects/shop-js
 *
 * Modifications and GnuPG multi precision integer (mpi) conversion added
 * 2004 by Herbert Hanewinkel, www.haneWIN.de
 */

// --- Arbitrary Precision Math ---
// badd(a,b), bsub(a,b), bsqr(a), bmul(a,b)
// bdiv(a,b), bmod(a,b), bexpmod(g,e,m), bmodexp(g,e,m)

// bs is the shift, bm is the mask
// set single precision bits to 28
var bs=28;
var bx2=1<<bs, bm=bx2-1, bx=bx2>>1, bd=bs>>1, bdm=(1<<bd)-1;

var log2=Math.log(2);

function zeros(n) {
    var r=new Array(n);
    while(n-->0) r[n]=0;
    return r;
}

function zclip(r){
    var n = r.length;
    if(r[n-1]) return r;
    while(n>1 && r[n-1]==0) n--;
    return r.slice(0,n);
}

// returns bit length of integer x
function nbits(x) {
    var n = 1, t;
    if((t=x>>>16) != 0) { x = t; n += 16; }
    if((t=x>>8) != 0) { x = t; n += 8; }
    if((t=x>>4) != 0) { x = t; n += 4; }
    if((t=x>>2) != 0) { x = t; n += 2; }
    if((t=x>>1) != 0) { x = t; n += 1; }
    return n;
}

function badd(a,b) {
    var al=a.length;
    var bl=b.length;

    if(al < bl) return badd(b,a);

    var r=new Array(al);
    var c=0, n=0;

    for(; n<bl; n++) {
        c+=a[n]+b[n];
        r[n]=c & bm;
        c>>>=bs;
    }
    for(; n<al; n++) {
        c+=a[n];
        r[n]=c & bm;
        c>>>=bs;
    }
    if(c) r[n]=c;
    return r;
}

function bsub(a,b) {
    var al=a.length;
    var bl=b.length;

    if(bl > al) return [];
    if(bl == al) {
        if(b[bl-1] > a[bl-1]) return [];
        if(bl==1) return [a[0]-b[0]];
    }

    var r=new Array(al);
    var c=0;

    for(var n=0; n<bl; n++) {
        c+=a[n]-b[n];
        r[n]=c & bm;
        c>>=bs;
    }
    for(;n<al; n++) {
        c+=a[n];
        r[n]=c & bm;
        c>>=bs;
    }
    if(c) return [];

    return zclip(r);
}

function ip(w, n, x, y, c) {
    var xl = x&bdm;
    var xh = x>>bd;

    var yl = y&bdm;
    var yh = y>>bd;

    var m = xh*yl+yh*xl;
    var l = xl*yl+((m&bdm)<<bd)+w[n]+c;
    w[n] = l&bm;
    c = xh*yh+(m>>bd)+(l>>bs);
    return c;
}

// Multiple-precision squaring, HAC Algorithm 14.16

function bsqr(x) {
    var t = x.length;
    var n = 2*t;
    var r = zeros(n);
    var c = 0;
    var i, j;

    for(i = 0; i < t; i++) {
        c = ip(r,2*i,x[i],x[i],0);
        for(j = i+1; j < t; j++) {
            c = ip(r,i+j,2*x[j],x[i],c);
        }
        r[i+t] = c;
    }

    return zclip(r);
}

// Multiple-precision multiplication, HAC Algorithm 14.12

function bmul(x,y) {
    var n = x.length;
    var t = y.length;
    var r = zeros(n+t-1);
    var c, i, j;

    for(i = 0; i < t; i++) {
        c = 0;
        for(j = 0; j < n; j++) {
            c = ip(r,i+j,x[j],y[i],c);
        }
        r[i+n] = c;
    }

    return zclip(r);
}

function toppart(x,start,len) {
    var n=0;
    while(start >= 0 && len-->0) n=n*bx2+x[start--];
    return n;
}

// Multiple-precision division, HAC Algorithm 14.20

function bdiv(a,b) {
    var n=a.length-1;
    var t=b.length-1;
    var nmt=n-t;

    // trivial cases; a < b
    if(n < t || n==t && (a[n]<b[n] || n>0 && a[n]==b[n] && a[n-1]<b[n-1])) {
        this.q=[0]; this.mod=a;
        return this;
    }

    // trivial cases; q < 4
    if(n==t && toppart(a,t,2)/toppart(b,t,2) <4) {
        var x=a.concat();
        var qq=0;
        var xx;
        for(;;) {
            xx=bsub(x,b);
            if(xx.length==0) break;
            x=xx; qq++;
        }
        this.q=[qq]; this.mod=x;
        return this;
    }

    // normalize
    var shift2=Math.floor(Math.log(b[t])/log2)+1;
    var shift=bs-shift2;

    var x=a.concat();
    var y=b.concat();

    if(shift) {
        for(i=t; i>0; i--) y[i]=((y[i]<<shift) & bm) | (y[i-1] >> shift2);
        y[0]=(y[0]<<shift) & bm;
        if(x[n] & ((bm <<shift2) & bm)) {
            x[++n]=0; nmt++;
        }
        for(i=n; i>0; i--) x[i]=((x[i]<<shift) & bm) | (x[i-1] >> shift2);
        x[0]=(x[0]<<shift) & bm;
    }

    var i, j, x2;
    var q=zeros(nmt+1);
    var y2=zeros(nmt).concat(y);
    for(;;) {
        x2=bsub(x,y2);
        if(x2.length==0) break;
        q[nmt]++;
        x=x2;
    }

    var yt=y[t], top=toppart(y,t,2)
    for(i=n; i>t; i--) {
        var m=i-t-1;
        if(i >= x.length) q[m]=1;
        else if(x[i] == yt) q[m]=bm;
        else q[m]=Math.floor(toppart(x,i,2)/yt);

        var topx=toppart(x,i,3);
        while(q[m] * top > topx) q[m]--;

        //x-=q[m]*y*b^m
        y2=y2.slice(1);
        x2=bsub(x,bmul([q[m]],y2));
        if(x2.length==0) {
            q[m]--;
            x2=bsub(x,bmul([q[m]],y2));
        }
        x=x2;
    }
    // de-normalize
    if(shift) {
        for(i=0; i<x.length-1; i++) x[i]=(x[i]>>shift) | ((x[i+1] << shift2) & bm);
        x[x.length-1]>>=shift;
    }

    this.q = zclip(q);
    this.mod = zclip(x);
    return this;
}

function simplemod(i,m) { // returns the mod where m < 2^bd
    var c=0, v;
    for(var n=i.length-1; n>=0; n--) {
        v=i[n];
        c=((v >> bd) + (c<<bd)) % m;
        c=((v & bdm) + (c<<bd)) % m;
    }
    return c;
}

function bmod(p,m) {
    if(m.length==1) {
        if(p.length==1) return [p[0] % m[0]];
        if(m[0] < bdm) return [simplemod(p,m[0])];
    }
    var r=bdiv(p,m);
    return r.mod;
}

// Barrett's modular reduction, HAC Algorithm 14.42

function bmod2(x,m,mu) {
    var xl=x.length - (m.length << 1);
    if(xl > 0) return bmod2(x.slice(0,xl).concat(bmod2(x.slice(xl),m,mu)),m,mu);

    var ml1=m.length+1, ml2=m.length-1,rr;
    //var q1=x.slice(ml2)
    //var q2=bmul(q1,mu)
    var q3=bmul(x.slice(ml2),mu).slice(ml1);
    var r1=x.slice(0,ml1);
    var r2=bmul(q3,m).slice(0,ml1);
    var r=bsub(r1,r2);

    if(r.length==0) {
        r1[ml1]=1;
        r=bsub(r1,r2);
    }
    for(var n=0;;n++) {
        rr=bsub(r,m);
        if(rr.length==0) break;
        r=rr;
        if(n>=3) return bmod2(r,m,mu);
    }
    return r;
}

// Modular exponentiation, HAC Algorithm 14.79

function bexpmod(g,e,m) {
    var a = g.concat();
    var l = e.length-1;
    var n = nbits(e[l])-2;

    for(; l >= 0; l--) {
        for(; n >= 0; n-=1) {
            a=bmod(bsqr(a),m);
            if(e[l] & (1<<n)) a=bmod(bmul(a,g),m);
        }
        n = bs-1;
    }
    return a;
}

// Modular exponentiation using Barrett reduction

function bmodexp(g,e,m) {
    var a=g.concat();
    var l=e.length-1;
    var n=m.length*2;
    var mu=zeros(n+1);
    mu[n]=1;
    mu=bdiv(mu,m).q;

    n = nbits(e[l])-2;

    for(; l >= 0; l--) {
        for(; n >= 0; n-=1) {
            a=bmod2(bsqr(a),m, mu);
            if(e[l] & (1<<n)) a=bmod2(bmul(a,g),m, mu);
        }
        n = bs-1;
    }
    return a;
}

// -----------------------------------------------------
// Compute s**e mod m for RSA public key operation

function RSAencrypt(s, e, m) { return bexpmod(s,e,m); }

// Compute m**d mod p*q for RSA private key operations.

function RSAdecrypt(m, d, p, q, u) {
    var xp = bmodexp(bmod(m,p), bmod(d,bsub(p,[1])), p);
    var xq = bmodexp(bmod(m,q), bmod(d,bsub(q,[1])), q);

    var t=bsub(xq,xp);
    if(t.length==0) {
        t=bsub(xp,xq);
        t=bmod(bmul(t, u), q);
        t=bsub(q,t);
    } else {
        t=bmod(bmul(t, u), q);
    } 
    return badd(bmul(t,p), xp);
}

// -----------------------------------------------------------------
// conversion functions: num array <-> multi precision integer (mpi)
// mpi: 2 octets with length in bits + octets in big endian order

function mpi2b(s) {
    var bn=1, r=[0], rn=0, sb=256;
    var c, sn=s.length;
    if(sn < 2) {
        alert('string too short, not a MPI');
        return 0;
    }

    var len=(sn-2)*8;
    var bits=s.charCodeAt(0)*256+s.charCodeAt(1);
    if(bits > len || bits < len-8) {
        alert('not a MPI, bits='+bits+",len="+len);
        return 0;
    }

    for(var n=0; n<len; n++) {
        if((sb<<=1) > 255) {
            sb=1; c=s.charCodeAt(--sn);
        }
        if(bn > bm) {
            bn=1;
            r[++rn]=0;
        }
        if(c & sb) r[rn]|=bn;
        bn<<=1;
    }
    return r;
}

function b2mpi(b) {
    var bn=1, bc=0, r=[0], rb=1, rn=0;
    var bits=b.length*bs;
    var n, rr='';

    for(n=0; n<bits; n++) {
        if(b[bc] & bn) r[rn]|=rb;
        if((rb<<=1) > 255) {
            rb=1; r[++rn]=0;
        }
        if((bn<<=1) > bm) {
            bn=1; bc++;
        }
    }

    while(rn && r[rn]==0) rn--;

    bn=256;
    for(bits=8; bits>0; bits--) if(r[rn] & (bn>>=1)) break;
    bits+=rn*8;

    rr+=String.fromCharCode(bits/256)+String.fromCharCode(bits%256);
    if(bits) for(n=rn; n>=0; n--) rr+=String.fromCharCode(r[n]);
    return rr;
}
