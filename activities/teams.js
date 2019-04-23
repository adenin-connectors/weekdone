'use strict';
const api = require('./common/api');

module.exports = async function (activity) {
  try {
    api.initialize(activity);
    const response = await api('/teams');
    if ($.isErrorResponse(activity, response)) return;

    activity.Response.Data = convertResponse(response);
  } catch (error) {
    $.handleError(activity, error);
  }
};
//**maps response data to items */
function convertResponse(response) {
  let items = [];
  let teams = response.body.teams;

  for (let i = 0; i < teams.length; i++) {
    let raw = teams[i];
    let item = {
      id: raw.id,
      title: raw.name,
      description: 'privacy' + raw.privacy,
      link: `https://weekdone.com/team/${raw.id}`,
      raw: raw
    };
    items.push(item);
  }

  return { items: items };
}