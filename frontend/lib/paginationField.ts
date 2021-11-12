import { PAGINATION_QUERY } from "../components/Pagination";

export default function paginationField() {
  return {
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      // first thing it does it asks the read function for those items
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const { productsCount } = data;
      const page = skip / first + 1;
      const pages = Math.ceil(productsCount / first);

      // check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);

      // if
      // there are items
      // and there  aren't enought items ot satisfy how many were requested
      // and we are on the last page
      // then just send it
      if (items.length && items.length !== first && page === pages) {
        return items;
      }

      if (items.length !== first) {
        // we don't have any items, we must go to the network to fetch
        return false;
      }

      // if there are items, just return from the cache, and we don't need to go to network
      if (items.length) {
        return items;
      }

      // we can either do one of tow things
      // first things we can do is return the items because they are already in the cache
      // The other thing we can do is to return false from here, (network request)
    },
    merge(existing, incoming, { args }) {
      const { skip } = args;

      // this runs when the apollo client comes back from the network our product
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      return merged;
    },
  };
}
