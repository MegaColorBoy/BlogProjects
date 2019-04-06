//Source code for the Stripe Bubble Header
const scrollingSpeed = 0.3;
const noise_speed = 0.003;
const noise_amnt = 5;
const canvas_width = 2800;
const marqueeEl = document.querySelector('.stripe-bubbles');

const bubbleSettings = [
    {cssClass:'logo-imgAffirm', s: .6, x: 77, y: 1134 }, 
    {cssClass:'logo-imgAllianz', s: .6, x: 271, y: 1620 }, 
    {cssClass:'logo-imgAmazon ', s: .6, x: 372, y: 1761 }, 
    {cssClass:'logo-imgBookingCom', s: .6, x: 79, y: 2499 }, 
    {cssClass:'logo-imgCatawiki', s: .6, x: 334, y: 2704 }, 
    {cssClass:'logo-imgCityofBoston', s: .6, x: 356, y: 2271 }, 
    {cssClass:'logo-imgDeliveroo', s: .6, x: 226, y: 795 }, 
    {cssClass:'logo-imgDoordash', s: .6, x: 256, y: 276 }, 
    {cssClass:'logo-imgExpedia', s: .6, x: 365, y: 1210 }, 
    {cssClass:'logo-imgFitbit', s: .6, x: 193, y: 444 }, 
    {cssClass:'logo-imgGoogle', s: .6, x: 387, y: 2545 }, 
    {cssClass:'logo-imgIndiegogo', s: .7, x: 193, y: 1303 }, 
    {cssClass:'logo-imgInstacart', s: .7, x: 88, y: 907 }, 
    {cssClass:'logo-imgKickstarter', s: .7, x: 320, y: 633 }, 
    {cssClass:'logo-imgLyft', s: .7, x: 76, y: 323 }, 
    {cssClass:'logo-imgNasdaq', s: .7, x: 357, y: 129 }, 
    {cssClass:'logo-imgNat-Geo ', s: .7, x: 342, y: 1440 }, 
    {cssClass:'logo-imgRackspace', s: .7, x: 293, y: 1929 }, 
    {cssClass:'logo-imgReddit', s: .7, x: 198, y: 2135 }, 
    {cssClass:'logo-imgSalesforce', s: .7, x: 82, y: 2276 }, 
    {cssClass:'logo-imgShopify', s: .7, x: 182, y: 2654 }, 
    {cssClass:'logo-imgSlack', s: .7, x: 75, y: 2783 }, 
    {cssClass:'logo-imgSpotify', s: .7, x: 118, y: 1519 }, 
    {cssClass:'logo-imgSquarespace', s: .7, x: 233, y: 1071 }, 
    {cssClass:'logo-imgTarget', s: .7, x: 148, y: 1773 }, 
    {cssClass:'logo-imgTed', s: .7, x: 385, y: 2098 }, 
    {cssClass:'logo-imgTheGuardian', s: .7, x: 244, y: 2423 }, 
    {cssClass:'logo-imgTwitch', s: .7, x: 385, y: 901 }, 
    {cssClass:'logo-imgUber', s: .7, x: 111, y: 624 }, 
    {cssClass:'logo-imgWeTransfer', s: .7, x: 103, y: 145 }, 
    {cssClass:'logo-imgWish', s: .7, x: 367, y: 413 }, 
    {cssClass:'logo-imgXero', s: .7, x: 251, y: 2805 }, 
    {cssClass:'logo-imgYelp', s: .7, x: 75, y: 1990 }
];

class Bubble {
	constructor(index, {cssClass, x, y, s=.9}){
		this.index = index;
		this.x = x;
		this.y = y;
		this.scale = s;
		this.cssClass = cssClass;

		this.noiseSeedX = Math.floor(Math.random() * 64000);
		this.noiseSeedY = Math.floor(Math.random() * 64000);

		let randomX = noise.simplex2(this.noiseSeedX, 0);
		let randomY = noise.simplex2(this.noiseSeedY, 0);

		this.el = document.createElement("div");
		this.el.className = `stripe-bubble ${this.cssClass}`;

		marqueeEl.appendChild(this.el);
	}

	update(){

		this.noiseSeedX += noise_speed;
		this.noiseSeedY += noise_speed;

		var randomXPos = noise.simplex2(this.noiseSeedX, 0);
		var randomYPos = noise.simplex2(this.noiseSeedY, 0);

		this.y -= scrollingSpeed;

		this.xNoisePos = this.x + (randomXPos * noise_amnt); 
		this.yNoisePos = this.y + (randomYPos * noise_amnt); 

		if(this.y < -500)
		{
			this.y = canvas_width;
		}

		this.el.style.transform = `translate(${this.xNoisePos}px, ${this.yNoisePos}px) scale(${this.scale})`;
	}
}

class BubbleMarquee{
	constructor(settings){
		this.bubbles = [];

		settings.forEach((setting, index) =>{
			this.bubbles.push(new Bubble(index, setting));
		});

		requestAnimationFrame(this.update.bind(this));
	}

	update(){
		this.bubbles.forEach(bubble => bubble.update());
		this.raf = requestAnimationFrame(this.update.bind(this));
	}
}

noise.seed(Math.floor(Math.random() * 64000));
const init = new BubbleMarquee(bubbleSettings);