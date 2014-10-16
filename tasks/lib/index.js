var dox = require('dox');
var path = require('path');
var _ = require('lodash');
var _s = require('underscore.string');
var Mustache = require('mustache');

function Resource(filepath, content) {
    this.filepath = filepath;
    this.basename = path.basename(filepath);
    this.content = content;
}
exports.Resource = Resource;


function parseComments(resource) {
    resource.content = dox.parseComments(resource.content);
    return resource;
}
exports.parseComments = parseComments;

function extractTag(type, propertyName, block) {
    var tags = block.tags || [];
    var result = _.filter(tags, {
        type: type
    });

    if (_.isEmpty(result)) {
        return block;
    }

    block[propertyName] = result;

    block.tags = _.reject(block.tags, {
        type: type
    });

    return block;
}

function ctxParameters(block) {
    if (!block.ctx) {
        return block;
    }
    var params = _.pluck(block.parameters, 'name').join(', ');
    block.ctx.parameters = params;
    return block;
}

function ctxIsType(block) {
    if (!block.ctx) {
        return block;
    }

    var type = _s.capitalize(block.ctx.type);

    block.ctx['is' + type] = true;

    return block;
}

function ctxNormalizeValue(block) {
    if (!block.ctx) {
        return block;
    }

    var value = _s.trim(block.ctx.value);

    var invalidMatches = ['{'];

    if (invalidMatches.some(function(item) {
        return item === value;
    })) {
        delete block.ctx.value;
    }

    return block;
}

function normalizeSummary(block) {
    if (!_.isEmpty(block.summary) &&
        _.isEmpty(block.description.summary)) {
        block.description.summary = block.summary[0].string;
    }

    return block;
}

function parseBlocks(content) {
    return content
        .map(_.partial(extractTag, 'param', 'parameters'))
        .map(_.partial(extractTag, 'summary', 'summary'))
        .map(_.partial(extractTag, 'return', 'return'))
        .map(_.partial(extractTag, 'description', 'desc'))
        .map(ctxIsType)
        .map(ctxParameters)
        .map(normalizeSummary)
        .map(ctxNormalizeValue);
}

function transformContent(options, resource) {
    resource.options = options;
    resource.content = parseBlocks(resource.content);

    return resource;
}
exports.transformContent = transformContent;

function removeIgnored(resource) {
    resource.content = _.reject(resource.content, {
        ignore: true
    });

    return resource;
}
exports.removeIgnored = removeIgnored;

function toMarkdown(templates, resource) {
    return Mustache.render(templates.module, resource);
}
exports.toMarkdown = toMarkdown;
