module.exports = {
  theme: {
    extend: {
      container: {
        center:'true',
        padding:'1rem'
      },
      colors: {
        warning: '#FF9F1C',
        success: '#2EC4B6',
        danger: '#E71D36',
      },
      boxShadow: {
        top: '0px -5px 15px rgba(0, 0, 0, 0.1)',
      },
    }
  },
  variants: {},
  plugins: [],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './public/**/*.html',
      './src/**/*.vue'
    ]
  }
}