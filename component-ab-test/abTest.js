'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ABTestMgr = require('dw/campaign/ABTestMgr');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

module.exports.render = function (context) {
	var content = context.content;
	var model = new HashMap();
	model.regions = PageRenderHelper.getRegionModelRegistry(context.component);

	model.A = false;
	model.B = false;

	if (PageRenderHelper.isInEditMode()) {
		model.A = true;
		model.B = true;
	}

	if (ABTestMgr.isParticipant(content.abTestID, content.testSegmentID)) {
		model.A = true;
	} else {
		model.B = true;
	}

	var expiry = new Date();
	expiry.setHours(expiry.getHours() + 1);
	response.setExpires(expiry);
	response.setVaryBy('price_promotion');

	return new Template('experience/components/commerce_smglayouts/abTest').render(model).text;
};
