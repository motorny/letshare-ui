/*
 * NewsPageConstants
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_MAIN = 'its/NewsPage/LOAD_MAIN';
export const LOAD_MAIN_SUCCESS = 'its/NewsPage/LOAD_MAIN_SUCCESS';
export const LOAD_MAIN_ERROR = 'its/NewsPage/LOAD_MAIN_ERROR';

const contentTemplate = table =>
  `${table}
  { name, RU, EN }
`;

export const getMainQuery = {
  query: `${'{' +
    'benefits { RU, EN }' +
    'contacts { name, link, RU, EN }' +
    'links { name, link }' +
    'mainwords { RU, EN }' +
    'services { name_RU, name_EN, description_RU, description_EN }' +
    'statistics { amount, RU, EN }' +
    'partners { logo_v2_h3 { url } }' +
    'solutions { title_RU, title_EN, description_RU, description_EN, img_v2_h3 { url } }' +
    'homeimages { name, img { url } }'}${contentTemplate(
    'contactus',
  )}${contentTemplate('homecommunities')}${contentTemplate(
    'homeexpertises',
  )}${contentTemplate('homemains')}${contentTemplate(
    'homenumbers',
  )}${contentTemplate('homepartners')}${contentTemplate('homesolutions')}}`,
};
