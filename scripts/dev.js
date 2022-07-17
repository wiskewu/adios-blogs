const { serve } = require('adios-blog-cli');
const path = require('path');

serve(path.resolve(__dirname, '..'));