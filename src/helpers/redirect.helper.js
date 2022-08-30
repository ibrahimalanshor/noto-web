export default (route, { tagId } = {}) => {
  const redirect = {
    default: { name: 'Home' },
    favorite: { name: 'Favorite' },
    trash: { name: 'Trash' },
    tag: { name: tagId ? 'TagDetail' : 'Tag', params: { id: tagId } },
  };

  return redirect[route] ?? redirect.default;
};
