const useStoreOpenCart = <T, F>(
    store: (callback: (state: T) => F) => F,
    callback: (state: T) => F,
  ) => {
    return store(callback);
  };
  
  export default useStoreOpenCart;
  