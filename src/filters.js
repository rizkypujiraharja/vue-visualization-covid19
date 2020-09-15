export default {
    uppercase(val) {
      if (typeof val === "string") {
        return val.toUpperCase();
      }
      return val;
    },
    numberWithDot(val) {
      if (typeof val === "number") {
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
    }
  };