#npm init -y #npm install express #npm install mongoose --save #npm install
typescript --save-dev #npm i cors #npm i dotenv #tsc -init #npm run build #npm i
--save-dev @types/node #npm i --save-dev @types/express #npm i --save-dev
@types/cors #npm install eslint @typescript-eslint/parser
@typescript-eslint/eslint-plugin --save-dev #npx eslint
--init(problem>enter,import/export,....) #to see problem:npx eslint src ./npm
run lint #to fix the problem:npx eslint src --fix/npm run lint:fix
###To solve the js error issue for eslint:1.place this in script inside the pakage.json(
"start:prod": "node ./dist/server.js",
"start:dev": "npx ts-node-dev --respawn --transpile-only src/server.ts",
"build": "tsc",
"lint": "npx eslint src --ignore-pattern .ts",
"lint:fix": "npx eslint src --fix",
"prettier": "prettier --ignore-path .gitignore --write \"./src/\*_/_.+(js|ts|json)\"",
"prettier:fix": "npx prettier --write src",
"test": "echo \"Error: no test specified\" && exit 1"
), 2.place this code inside the eslint.config.mjs(
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
{
ignores: ['**/node_modules/', '.dist/'],
languageOptions: {
globals: {
...globals.browser,
process: 'readonly',
},
},

    rules: {
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
    },

},

pluginJs.configs.recommended,
...tseslint.configs.recommended,
];

), 3.place this code inside the seetings in vs code(
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnSave": true,
)
#npm install
--save-dev prettier
#npx prettier --write src/app.ts (kono space gap thakle thik koredeyar kotha)
#npm install --save-dev eslint-config-prettier(pretter and eslint er conflict ta dur korte eita install korte hobe)
##npm run build(for compile js file)
##node ./dist/server.js(to run the project)
#npm i ts-node-dev --save-dev(to solve the again and again command npm run build)
#npx ts-node-dev --respawn --transpile-only src/server.ts(must use npx first, otherwise dont work )
1.prepare interface> //student.interface.ts(

import { Schema, model, connect } from 'mongoose';
export type Guardian = {
fatherName: string;
fatherOccupation: string;
fatherContactNo: string;
mothersName: string;
motherOccupation: string;
motherContactNo: string;
};
export type UserName = {
firstName: string;
middleName: string;
lastName: string;
};
export type LocalGuardian = {
name: string;
occupation: string;
contactNo: string;
};
export type Student = {
id: string;
name: UserName;
gender: 'male' | 'female';
dateOfBirth: string;
email: string;
contactNo: string;
emergencyContactNo: string;
bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
presentAddress: string;
permanentAddress: string;
guardian: Guardian;
localGuardian: LocalGuardian;
profileImg?: string;
isActive: 'active' | 'inactive';
};

)
##database er sathe compass connect korte: mongodb compass e env er url ta dite hoe>save korte hobe>project er name ta dite hobe> save korte hobe>connect dile project er moddhe collection ta chole asbe
