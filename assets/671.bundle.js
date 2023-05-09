"use strict";(self.webpackChunkshopify_thirdweb=self.webpackChunkshopify_thirdweb||[]).push([[671],{85671:(t,r,e)=>{e.r(r),e.d(r,{MarketplaceV3:()=>W});var a=e(84277),i=e(90864),n=e(1604),s=e(25025),o=e(70332),c=e(8455),d=e(2593),p=e(96519),u=e(9279),l=e(77616),h=e(38776),g=e(49242),m=(e(13550),e(26219),e(68834),e(65660),e(61303),e(71497),e(94317),e(13670),e(79120),e(97604),e(8187),e(19362),e(59190),e(54730),e(36250),e(85725),e(38730),e(48507),e(38398),e(2090),e(86841),e(49561),e(80580),e(40246),e(54253),e(91559),e(40553),e(26),e(69392),e(29526),e(24601),e(46878),e(77033),e(87033),e(5158),e(27761),e(20583),e(92355),e(84194),e(51121),e(58613),e(32484),e(78435),e(54098),e(54146),e(62555),e(40721),e(82037),e(77437),e(59189),e(2162),e(64063),e(34161),e(50266),e(98839),e(51375),e(43320),e(65815),e(52378),e(55173),e(77191),e(25108));const f=n.z.object({assetContractAddress:i.ad,tokenId:i.ab,quantity:i.ab.default(1),currencyContractAddress:i.ad.default(i.cc),pricePerToken:a.A,startTimestamp:i.ae.default(new Date),endTimestamp:i.ag,isReservedListing:n.z.boolean().default(!1)});class w{constructor(t,r){(0,a._)(this,"featureName",i.cQ.name),(0,a._)(this,"contractWrapper",void 0),(0,a._)(this,"storage",void 0),(0,a._)(this,"events",void 0),(0,a._)(this,"interceptor",void 0),(0,a._)(this,"encoder",void 0),(0,a._)(this,"estimator",void 0),this.contractWrapper=t,this.storage=r,this.events=new i.aV(this.contractWrapper),this.encoder=new i.aj(this.contractWrapper),this.interceptor=new i.aW(this.contractWrapper),this.estimator=new i.aU(this.contractWrapper)}getAddress(){return this.contractWrapper.readContract.address}async getTotalCount(){return await this.contractWrapper.readContract.totalListings()}async getAll(t){const r=await this.getTotalCount();let e=d.O$.from(t?.start||0).toNumber(),a=r.toNumber();if(0===a)throw new Error("No listings exist on the contract.");let n=[];n=(await(0,i.cR)(e,a,this.contractWrapper.readContract.getAllListings)).flat();const s=this.applyFilter(n,t);return await Promise.all(s.map((t=>this.mapListing(t))))}async getAllValid(t){const r=await this.getTotalCount();let e=d.O$.from(t?.start||0).toNumber(),a=r.toNumber();if(0===a)throw new Error("No listings exist on the contract.");let n=[];n=(await(0,i.cR)(e,a,this.contractWrapper.readContract.getAllValidListings)).flat();const s=this.applyFilter(n,t);return await Promise.all(s.map((t=>this.mapListing(t))))}async getListing(t){const r=await this.contractWrapper.readContract.getListing(t);return await this.mapListing(r)}async isBuyerApprovedForListing(t,r){if(!(await this.validateListing(d.O$.from(t))).isReservedListing)throw new Error(`Listing ${t} is not a reserved listing.`);return await this.contractWrapper.readContract.isBuyerApprovedForListing(t,r)}async isCurrencyApprovedForListing(t,r){return await this.validateListing(d.O$.from(t)),await this.contractWrapper.readContract.isCurrencyApprovedForListing(t,r)}async currencyPriceForListing(t,r){const e=await this.validateListing(d.O$.from(t));if(r===e.currencyContractAddress)return e.pricePerToken;if(!await this.isCurrencyApprovedForListing(t,r))throw new Error(`Currency ${r} is not approved for Listing ${t}.`);return await this.contractWrapper.readContract.currencyPriceForListing(t,r)}async createListing(t){const r=f.parse(t);await(0,i.cS)(this.contractWrapper,this.getAddress(),r.assetContractAddress,r.tokenId,await this.contractWrapper.getSignerAddress());const e=await(0,i.b8)(this.contractWrapper.getProvider(),r.pricePerToken,r.currencyContractAddress),a=(await this.contractWrapper.getProvider().getBlock("latest")).timestamp;r.startTimestamp.lt(a)&&(r.startTimestamp=d.O$.from(a));const n=await this.contractWrapper.sendTransaction("createListing",[{assetContract:r.assetContractAddress,tokenId:r.tokenId,quantity:r.quantity,currency:(0,i.cT)(r.currencyContractAddress),pricePerToken:e,startTimestamp:r.startTimestamp,endTimestamp:r.endTimestamp,reserved:r.isReservedListing}],{gasLimit:5e5});return{id:this.contractWrapper.parseLogs("NewListing",n?.logs)[0].args.listingId,receipt:n}}async updateListing(t,r){const e=f.parse(r);await(0,i.cS)(this.contractWrapper,this.getAddress(),e.assetContractAddress,e.tokenId,await this.contractWrapper.getSignerAddress());const a=await(0,i.b8)(this.contractWrapper.getProvider(),e.pricePerToken,e.currencyContractAddress),n=await this.contractWrapper.sendTransaction("updateListing",[t,{assetContract:e.assetContractAddress,tokenId:e.tokenId,quantity:e.quantity,currency:(0,i.cT)(e.currencyContractAddress),pricePerToken:a,startTimestamp:e.startTimestamp,endTimestamp:e.endTimestamp,reserved:e.isReservedListing}],{gasLimit:5e5});return{id:this.contractWrapper.parseLogs("UpdatedListing",n?.logs)[0].args.listingId,receipt:n}}async cancelListing(t){return{receipt:await this.contractWrapper.sendTransaction("cancelListing",[t])}}async buyFromListing(t,r,e){const a=await this.validateListing(d.O$.from(t)),{valid:n,error:s}=await this.isStillValidListing(a,r);if(!n)throw new Error(`Listing ${t} is no longer valid. ${s}`);const o=e||await this.contractWrapper.getSignerAddress(),c=d.O$.from(r),p=d.O$.from(a.pricePerToken).mul(c),u=await this.contractWrapper.getCallOverrides()||{};return await(0,i.cU)(this.contractWrapper,p,a.currencyContractAddress,u),{receipt:await this.contractWrapper.sendTransaction("buyFromListing",[t,o,c,a.currencyContractAddress,p],u)}}async approveBuyerForReservedListing(t,r){if(await this.isBuyerApprovedForListing(t,r))throw new Error(`Buyer ${r} already approved for listing ${t}.`);return{receipt:await this.contractWrapper.sendTransaction("approveBuyerForListing",[t,r,!0])}}async revokeBuyerApprovalForReservedListing(t,r){if(await this.isBuyerApprovedForListing(t,r))return{receipt:await this.contractWrapper.sendTransaction("approveBuyerForListing",[t,r,!1])};throw new Error(`Buyer ${r} not approved for listing ${t}.`)}async approveCurrencyForListing(t,r,e){const a=await this.validateListing(d.O$.from(t));r===a.currencyContractAddress&&(0,h.Z)(e===a.pricePerToken,"Approving listing currency with a different price.");const i=await this.contractWrapper.readContract.currencyPriceForListing(t,r);return(0,h.Z)(e===i,"Currency already approved with this price."),{receipt:await this.contractWrapper.sendTransaction("approveCurrencyForListing",[t,r,e])}}async revokeCurrencyApprovalForListing(t,r){if(r===(await this.validateListing(d.O$.from(t))).currencyContractAddress)throw new Error("Can't revoke approval for main listing currency.");const e=await this.contractWrapper.readContract.currencyPriceForListing(t,r);return(0,h.Z)(!e.isZero(),"Currency not approved."),{receipt:await this.contractWrapper.sendTransaction("approveCurrencyForListing",[t,r,d.O$.from(0)])}}async validateListing(t){try{return await this.getListing(t)}catch(r){throw m.error(`Error getting the listing with id ${t}`),r}}async mapListing(t){let r=i.b2.UNSET;const e=(await this.contractWrapper.getProvider().getBlock("latest")).timestamp;switch(t.status){case 1:r=d.O$.from(t.startTimestamp).gt(e)?i.b2.Created:d.O$.from(t.endTimestamp).lt(e)?i.b2.Expired:i.b2.Active;break;case 2:r=i.b2.Completed;break;case 3:r=i.b2.Cancelled}return{assetContractAddress:t.assetContract,currencyContractAddress:t.currency,pricePerToken:t.pricePerToken.toString(),currencyValuePerToken:await(0,i.b6)(this.contractWrapper.getProvider(),t.currency,t.pricePerToken),id:t.listingId.toString(),tokenId:t.tokenId.toString(),quantity:t.quantity.toString(),startTimeInSeconds:d.O$.from(t.startTimestamp).toNumber(),asset:await(0,i.cV)(t.assetContract,this.contractWrapper.getProvider(),t.tokenId,this.storage),endTimeInSeconds:d.O$.from(t.endTimestamp).toNumber(),creatorAddress:t.listingCreator,isReservedListing:t.reserved,status:r}}async isStillValidListing(t,r){if(!await(0,i.cW)(this.contractWrapper.getProvider(),this.getAddress(),t.assetContractAddress,t.tokenId,t.creatorAddress))return{valid:!1,error:`Token '${t.tokenId}' from contract '${t.assetContractAddress}' is not approved for transfer`};const e=this.contractWrapper.getProvider(),a=new p.CH(t.assetContractAddress,s,e),n=await a.supportsInterface(i.ca),d=await a.supportsInterface(i.cb);if(n){const r=new p.CH(t.assetContractAddress,o,e),a=(await r.ownerOf(t.tokenId)).toLowerCase()===t.creatorAddress.toLowerCase();return{valid:a,error:a?void 0:`Seller is not the owner of Token '${t.tokenId}' from contract '${t.assetContractAddress} anymore'`}}if(d){const a=new p.CH(t.assetContractAddress,c,e),i=(await a.balanceOf(t.creatorAddress,t.tokenId)).gte(r||t.quantity);return{valid:i,error:i?void 0:`Seller does not have enough balance of Token '${t.tokenId}' from contract '${t.assetContractAddress} to fulfill the listing`}}return{valid:!1,error:"Contract does not implement ERC 1155 or ERC 721."}}applyFilter(t,r){let e=[...t];return r&&(r.seller&&(e=e.filter((t=>t.listingCreator.toString().toLowerCase()===r?.seller?.toString().toLowerCase()))),r.tokenContract&&(e=e.filter((t=>t.assetContract.toString().toLowerCase()===r?.tokenContract?.toString().toLowerCase()))),void 0!==r.tokenId&&(e=e.filter((t=>t.tokenId.toString()===r?.tokenId?.toString())))),r?.count&&r.count<e.length?e.slice(0,r.count):e}}const y=n.z.object({assetContractAddress:i.ad,tokenId:i.ab,quantity:i.ab.default(1),currencyContractAddress:i.ad.default(i.cc),minimumBidAmount:a.A,buyoutBidAmount:a.A,timeBufferInSeconds:i.ab.default(900),bidBufferBps:i.ab.default(500),startTimestamp:i.ae.default(new Date),endTimestamp:i.ag});class A{constructor(t,r){(0,a._)(this,"featureName",i.cX.name),(0,a._)(this,"contractWrapper",void 0),(0,a._)(this,"storage",void 0),(0,a._)(this,"events",void 0),(0,a._)(this,"interceptor",void 0),(0,a._)(this,"encoder",void 0),(0,a._)(this,"estimator",void 0),this.contractWrapper=t,this.storage=r,this.events=new i.aV(this.contractWrapper),this.encoder=new i.aj(this.contractWrapper),this.interceptor=new i.aW(this.contractWrapper),this.estimator=new i.aU(this.contractWrapper)}getAddress(){return this.contractWrapper.readContract.address}async getTotalCount(){return await this.contractWrapper.readContract.totalAuctions()}async getAll(t){const r=await this.getTotalCount();let e=d.O$.from(t?.start||0).toNumber(),a=r.toNumber();if(0===a)throw new Error("No auctions exist on the contract.");let n=[];n=(await(0,i.cR)(e,a,this.contractWrapper.readContract.getAllAuctions)).flat();const s=this.applyFilter(n,t);return await Promise.all(s.map((t=>this.mapAuction(t))))}async getAllValid(t){const r=await this.getTotalCount();let e=d.O$.from(t?.start||0).toNumber(),a=r.toNumber();if(0===a)throw new Error("No auctions exist on the contract.");let n=[];n=(await(0,i.cR)(e,a,this.contractWrapper.readContract.getAllValidAuctions)).flat();const s=this.applyFilter(n,t);return await Promise.all(s.map((t=>this.mapAuction(t))))}async getAuction(t){const r=await this.contractWrapper.readContract.getAuction(t);return await this.mapAuction(r)}async getWinningBid(t){await this.validateAuction(d.O$.from(t));const r=await this.contractWrapper.readContract.getWinningBid(t);if(r._bidder!==u.d)return await this.mapBid(t.toString(),r._bidder,r._currency,r._bidAmount.toString())}async isWinningBid(t,r){return await this.contractWrapper.readContract.isNewWinningBid(t,r)}async getWinner(t){const r=await this.validateAuction(d.O$.from(t)),e=await this.contractWrapper.readContract.getWinningBid(t),a=d.O$.from(Math.floor(Date.now()/1e3)),i=d.O$.from(r.endTimeInSeconds);if(a.gt(i)&&e._bidder!==u.d)return e._bidder;const n=(await this.contractWrapper.readContract.queryFilter(this.contractWrapper.readContract.filters.AuctionClosed())).find((r=>r.args.auctionId.eq(d.O$.from(t))));if(!n)throw new Error(`Could not find auction with ID ${t} in closed auctions`);return n.args.winningBidder}async createAuction(t){const r=y.parse(t);await(0,i.cS)(this.contractWrapper,this.getAddress(),r.assetContractAddress,r.tokenId,await this.contractWrapper.getSignerAddress());const e=await(0,i.b8)(this.contractWrapper.getProvider(),r.buyoutBidAmount,r.currencyContractAddress),a=await(0,i.b8)(this.contractWrapper.getProvider(),r.minimumBidAmount,r.currencyContractAddress),n=(await this.contractWrapper.getProvider().getBlock("latest")).timestamp;r.startTimestamp.lt(n)&&(r.startTimestamp=d.O$.from(n));const s=await this.contractWrapper.sendTransaction("createAuction",[{assetContract:r.assetContractAddress,tokenId:r.tokenId,quantity:r.quantity,currency:(0,i.cT)(r.currencyContractAddress),minimumBidAmount:a,buyoutBidAmount:e,timeBufferInSeconds:r.timeBufferInSeconds,bidBufferBps:r.bidBufferBps,startTimestamp:r.startTimestamp,endTimestamp:r.endTimestamp}],{gasLimit:5e5});return{id:this.contractWrapper.parseLogs("NewAuction",s?.logs)[0].args.auctionId,receipt:s}}async buyoutAuction(t){const r=await this.validateAuction(d.O$.from(t)),e=await(0,i.b7)(this.contractWrapper.getProvider(),r.currencyContractAddress);return this.makeBid(t,l.formatUnits(r.buyoutBidAmount,e.decimals))}async makeBid(t,r){const e=await this.validateAuction(d.O$.from(t)),a=await(0,i.b8)(this.contractWrapper.getProvider(),r,e.currencyContractAddress);if(a.eq(d.O$.from(0)))throw new Error("Cannot make a bid with 0 value");if(d.O$.from(e.buyoutBidAmount).gt(0)&&a.gt(e.buyoutBidAmount))throw new Error("Bid amount must be less than or equal to buyoutBidAmount");if(await this.getWinningBid(t)){const r=await this.isWinningBid(t,a);(0,h.Z)(r,"Bid price is too low based on the current winning bid and the bid buffer")}else{const t=a,r=d.O$.from(e.minimumBidAmount);(0,h.Z)(t.gte(r),"Bid price is too low based on minimum bid amount")}const n=await this.contractWrapper.getCallOverrides()||{};return await(0,i.cU)(this.contractWrapper,a,e.currencyContractAddress,n),{receipt:await this.contractWrapper.sendTransaction("bidInAuction",[t,a],n)}}async cancelAuction(t){if(await this.getWinningBid(t))throw new Error("Bids already made.");return{receipt:await this.contractWrapper.sendTransaction("cancelAuction",[t])}}async closeAuctionForBidder(t,r){r||(r=await this.contractWrapper.getSignerAddress());const e=await this.validateAuction(d.O$.from(t));try{return{receipt:await this.contractWrapper.sendTransaction("collectAuctionTokens",[d.O$.from(t)])}}catch(r){throw r.message.includes("Marketplace: auction still active.")?new i.bt(t.toString(),e.endTimeInSeconds.toString()):r}}async closeAuctionForSeller(t){const r=await this.validateAuction(d.O$.from(t));try{return{receipt:await this.contractWrapper.sendTransaction("collectAuctionPayout",[d.O$.from(t)])}}catch(e){throw e.message.includes("Marketplace: auction still active.")?new i.bt(t.toString(),r.endTimeInSeconds.toString()):e}}async executeSale(t){const r=await this.validateAuction(d.O$.from(t));try{const r=await this.getWinningBid(t);(0,h.Z)(r,"No winning bid found");const e=this.encoder.encode("collectAuctionPayout",[t]),a=this.encoder.encode("collectAuctionTokens",[t]);return await this.contractWrapper.multiCall([e,a])}catch(e){throw e.message.includes("Marketplace: auction still active.")?new i.bt(t.toString(),r.endTimeInSeconds.toString()):e}}async getBidBufferBps(t){return(await this.getAuction(t)).bidBufferBps}async getMinimumNextBid(t){const[r,e,a]=await Promise.all([this.getBidBufferBps(t),this.getWinningBid(t),await this.validateAuction(d.O$.from(t))]),n=e?d.O$.from(e.bidAmount):d.O$.from(a.minimumBidAmount),s=n.add(n.mul(r).div(1e4));return(0,i.b6)(this.contractWrapper.getProvider(),a.currencyContractAddress,s)}async validateAuction(t){try{return await this.getAuction(t)}catch(r){throw m.error(`Error getting the auction with id ${t}`),r}}async mapAuction(t){let r=i.b2.UNSET;const e=(await this.contractWrapper.getProvider().getBlock("latest")).timestamp;switch(t.status){case 1:r=d.O$.from(t.startTimestamp).gt(e)?i.b2.Created:d.O$.from(t.endTimestamp).lt(e)?i.b2.Expired:i.b2.Active;break;case 2:r=i.b2.Completed;break;case 3:r=i.b2.Cancelled}return{id:t.auctionId.toString(),creatorAddress:t.auctionCreator,assetContractAddress:t.assetContract,tokenId:t.tokenId.toString(),quantity:t.quantity.toString(),currencyContractAddress:t.currency,minimumBidAmount:t.minimumBidAmount.toString(),minimumBidCurrencyValue:await(0,i.b6)(this.contractWrapper.getProvider(),t.currency,t.minimumBidAmount),buyoutBidAmount:t.buyoutBidAmount.toString(),buyoutCurrencyValue:await(0,i.b6)(this.contractWrapper.getProvider(),t.currency,t.buyoutBidAmount),timeBufferInSeconds:d.O$.from(t.timeBufferInSeconds).toNumber(),bidBufferBps:d.O$.from(t.bidBufferBps).toNumber(),startTimeInSeconds:d.O$.from(t.startTimestamp).toNumber(),endTimeInSeconds:d.O$.from(t.endTimestamp).toNumber(),asset:await(0,i.cV)(t.assetContract,this.contractWrapper.getProvider(),t.tokenId,this.storage),status:r}}async mapBid(t,r,e,a){return{auctionId:t,bidderAddress:r,currencyContractAddress:e,bidAmount:a,bidAmountCurrencyValue:await(0,i.b6)(this.contractWrapper.getProvider(),e,a)}}applyFilter(t,r){let e=[...t];return r&&(r.seller&&(e=e.filter((t=>t.auctionCreator.toString().toLowerCase()===r?.seller?.toString().toLowerCase()))),r.tokenContract&&(e=e.filter((t=>t.assetContract.toString().toLowerCase()===r?.tokenContract?.toString().toLowerCase()))),void 0!==r.tokenId&&(e=e.filter((t=>t.tokenId.toString()===r?.tokenId?.toString())))),r?.count&&r.count<e.length?e.slice(0,r.count):e}}const C=n.z.object({assetContractAddress:i.ad,tokenId:i.ab,quantity:i.ab.default(1),currencyContractAddress:i.ad.default(i.cc),totalPrice:a.A,endTimestamp:i.ag});class v{constructor(t,r){(0,a._)(this,"featureName",i.cY.name),(0,a._)(this,"contractWrapper",void 0),(0,a._)(this,"storage",void 0),(0,a._)(this,"events",void 0),(0,a._)(this,"interceptor",void 0),(0,a._)(this,"encoder",void 0),(0,a._)(this,"estimator",void 0),this.contractWrapper=t,this.storage=r,this.events=new i.aV(this.contractWrapper),this.encoder=new i.aj(this.contractWrapper),this.interceptor=new i.aW(this.contractWrapper),this.estimator=new i.aU(this.contractWrapper)}getAddress(){return this.contractWrapper.readContract.address}async getTotalCount(){return await this.contractWrapper.readContract.totalOffers()}async getAll(t){const r=await this.getTotalCount();let e=d.O$.from(t?.start||0).toNumber(),a=r.toNumber();if(0===a)throw new Error("No offers exist on the contract.");let n=[];n=(await(0,i.cR)(e,a,this.contractWrapper.readContract.getAllOffers)).flat();const s=this.applyFilter(n,t);return await Promise.all(s.map((t=>this.mapOffer(t))))}async getAllValid(t){const r=await this.getTotalCount();let e=d.O$.from(t?.start||0).toNumber(),a=r.toNumber();if(0===a)throw new Error("No offers exist on the contract.");let n=[];n=(await(0,i.cR)(e,a,this.contractWrapper.readContract.getAllValidOffers)).flat();const s=this.applyFilter(n,t);return await Promise.all(s.map((t=>this.mapOffer(t))))}async getOffer(t){const r=await this.contractWrapper.readContract.getOffer(t);return await this.mapOffer(r)}async makeOffer(t){const r=C.parse(t),e=await this.contractWrapper.getChainID(),a=(0,i.cP)(r.currencyContractAddress)?i.cd[e].wrapped.address:r.currencyContractAddress,n=await(0,i.b8)(this.contractWrapper.getProvider(),r.totalPrice,a),s=await this.contractWrapper.getCallOverrides();await(0,i.cU)(this.contractWrapper,n,a,s);const o=await this.contractWrapper.sendTransaction("makeOffer",[{assetContract:r.assetContractAddress,tokenId:r.tokenId,quantity:r.quantity,currency:a,totalPrice:n,expirationTimestamp:r.endTimestamp}],{gasLimit:5e5});return{id:this.contractWrapper.parseLogs("NewOffer",o?.logs)[0].args.offerId,receipt:o}}async cancelOffer(t){return{receipt:await this.contractWrapper.sendTransaction("cancelOffer",[t])}}async acceptOffer(t){const r=await this.validateOffer(d.O$.from(t)),{valid:e,error:a}=await this.isStillValidOffer(r);if(!e)throw new Error(`Offer ${t} is no longer valid. ${a}`);const n=await this.contractWrapper.getCallOverrides()||{};return await(0,i.cS)(this.contractWrapper,this.getAddress(),r.assetContractAddress,r.tokenId,await this.contractWrapper.getSignerAddress()),{receipt:await this.contractWrapper.sendTransaction("acceptOffer",[t],n)}}async validateOffer(t){try{return await this.getOffer(t)}catch(r){throw m.error(`Error getting the offer with id ${t}`),r}}async mapOffer(t){let r=i.b2.UNSET;const e=(await this.contractWrapper.getProvider().getBlock("latest")).timestamp;switch(t.status){case 1:r=d.O$.from(t.expirationTimestamp).lt(e)?i.b2.Expired:i.b2.Active;break;case 2:r=i.b2.Completed;break;case 3:r=i.b2.Cancelled}return{id:t.offerId.toString(),offerorAddress:t.offeror,assetContractAddress:t.assetContract,currencyContractAddress:t.currency,tokenId:t.tokenId.toString(),quantity:t.quantity.toString(),totalPrice:t.totalPrice.toString(),currencyValue:await(0,i.b6)(this.contractWrapper.getProvider(),t.currency,t.totalPrice),asset:await(0,i.cV)(t.assetContract,this.contractWrapper.getProvider(),t.tokenId,this.storage),endTimeInSeconds:d.O$.from(t.expirationTimestamp).toNumber(),status:r}}async isStillValidOffer(t){if(d.O$.from(Math.floor(Date.now()/1e3)).gt(t.endTimeInSeconds))return{valid:!1,error:`Offer with ID ${t.id} has expired`};const r=await this.contractWrapper.getChainID(),e=(0,i.cP)(t.currencyContractAddress)?i.cd[r].wrapped.address:t.currencyContractAddress,a=this.contractWrapper.getProvider(),n=new i.cK(a,e,g,{});return(await n.readContract.balanceOf(t.offerorAddress)).lt(t.totalPrice)?{valid:!1,error:`Offeror ${t.offerorAddress} doesn't have enough balance of token ${e}`}:(await n.readContract.allowance(t.offerorAddress,this.getAddress())).lt(t.totalPrice)?{valid:!1,error:`Offeror ${t.offerorAddress} hasn't approved enough amount of token ${e}`}:{valid:!0,error:""}}applyFilter(t,r){let e=[...t];return r&&(r.offeror&&(e=e.filter((t=>t.offeror.toString().toLowerCase()===r?.offeror?.toString().toLowerCase()))),r.tokenContract&&(e=e.filter((t=>t.assetContract.toString().toLowerCase()===r?.tokenContract?.toString().toLowerCase()))),void 0!==r.tokenId&&(e=e.filter((t=>t.tokenId.toString()===r?.tokenId?.toString())))),r?.count&&r.count<e.length?e.slice(0,r.count):e}}class W{get directListings(){return(0,i.bX)(this.detectDirectListings(),i.cQ)}get englishAuctions(){return(0,i.bX)(this.detectEnglishAuctions(),i.cX)}get offers(){return(0,i.bX)(this.detectOffers(),i.cY)}get chainId(){return this._chainId}constructor(t,r,e){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},s=arguments.length>4?arguments[4]:void 0,o=arguments.length>5?arguments[5]:void 0,c=arguments.length>6&&void 0!==arguments[6]?arguments[6]:new i.cK(t,r,s,n);(0,a._)(this,"abi",void 0),(0,a._)(this,"contractWrapper",void 0),(0,a._)(this,"storage",void 0),(0,a._)(this,"encoder",void 0),(0,a._)(this,"events",void 0),(0,a._)(this,"estimator",void 0),(0,a._)(this,"platformFees",void 0),(0,a._)(this,"metadata",void 0),(0,a._)(this,"roles",void 0),(0,a._)(this,"interceptor",void 0),(0,a._)(this,"_chainId",void 0),this._chainId=o,this.abi=s,this.contractWrapper=c,this.storage=e,this.metadata=new i.ak(this.contractWrapper,i.cN,this.storage),this.roles=new i.al(this.contractWrapper,W.contractRoles),this.encoder=new i.aj(this.contractWrapper),this.estimator=new i.aU(this.contractWrapper),this.events=new i.aV(this.contractWrapper),this.platformFees=new i.aX(this.contractWrapper),this.interceptor=new i.aW(this.contractWrapper)}onNetworkUpdated(t){this.contractWrapper.updateSignerOrProvider(t)}getAddress(){return this.contractWrapper.readContract.address}async call(t){for(var r=arguments.length,e=new Array(r>1?r-1:0),a=1;a<r;a++)e[a-1]=arguments[a];return this.contractWrapper.call(t,...e)}detectDirectListings(){if((0,i.bY)(this.contractWrapper,"DirectListings"))return new w(this.contractWrapper,this.storage)}detectEnglishAuctions(){if((0,i.bY)(this.contractWrapper,"EnglishAuctions"))return new A(this.contractWrapper,this.storage)}detectOffers(){if((0,i.bY)(this.contractWrapper,"Offers"))return new v(this.contractWrapper,this.storage)}}(0,a._)(W,"contractRoles",["admin","lister","asset"])}}]);