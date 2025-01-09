<!--
 * @Author: Chengya
 * @Description: Description
 * @Date: 2024-12-23 11:08:22
 * @LastEditors: Chengya
 * @LastEditTime: 2024-12-23 11:14:20
-->

# 基于 vue2 创建一个 vue 组件库

# 准备工作

1. 使用 vue 脚手架工具初始化一个模板项目
2. 正常模板项目
3. 根目录创建 packages 目录 来作为组件开发的根目录
4. 定义组件 比如定义一个简单的 Button 按钮 packages 下建立 Button 目录 ，
   Button 目录下建立 Button.vue（组件内容）和 index.js （Button 组件的入口文件 为了方便将来组件导出发布）
5. packages 目录下 创建 index.js 组件库的入口文件（以便将来对于组件进行统一的导出管理）

# 组件的开发

完成准备工作，就可以在 packages 对应目录下开发自己的组件，比如开发一个简单的 Button 组件，并且在 index.js 中进行导出管理

# 组件的测试

组件开发完成，通过在本地引入的方式 测试组件功能是否正常

# 组件的打包和发布

组件本地测试正常后进行打包相关的配置进行打包以及后续的发布

# 打包

1.  packages 根目录 通过 npm init 或手动创建 创建 package.json
    以下是关于 package.josn 关键内容的说明
    "name": "cya_vue_ui" 组件库名称
    "version": "1.0.0", 组件库版本号 后续更新版本发布到 npm 时要修改版本号
    "description": "vue 组件", 组件库描述
    main:'index.js' 组件库入口文件
    "scripts": {
    "build": "rollup -c"
    }, 将来配置打包命令
    "keywords": [
    "vue"
    ], 描述项目相关关键词。当其他人在 npm 搜索时，如果输入了与 keywords 中的某个词匹配的内容，能更容易地找到内容。
    "peerDependencies": {
    "vue": "^2.6.0"
    },
    指明了组件库与哪些版本的 Vue 是兼容的。它告诉用户，组件库依赖 Vue，但不应该由当前库直接安装 Vue，而是由使用库的项目来安装 Vue。这样可以避免版本冲突
    假设你发布的组件库是基于 Vue 2.x 的，而使用者可能已经在项目中安装了 Vue，你的组件库只需要声明它与 Vue 的兼容性，而不是重新安装 Vue。
    这里 vue:'^2.6.0' 的含义： ^ 表示“兼容版本范围”，这意味着组件库可以兼容 所有 2.x.x 的版本，只要它们大于或等于 2.6.0 即可
    "dependencies":{
    }
    组件库依赖的其他包 如果组件库依赖其他包 别人通过 npm install 来安装组件库时 依赖的其他包会一起安装
    在 package.json 中定义 dependencies 字段时，意味着你的组件库依赖某个包，并且你希望这个包随你的组件库一起安装。也就是说，如果你的组件库依赖某个包，比如 vue，那么当别人通过 npm install 安装你的组件库时，vue 会被一起安装进来。用于列出你的组件库直接依赖的第三方库(如 loadsh /axios)，它们会在用户安装组件库时自动安装。
    "devDependencies":{
    }
    这里的配置是组件库开发和打包时所需的依赖，只有在开发你的组件库时需要它们，用户安装你的组件库时不会安装这些内容

    "main": "dist/cya_vue_ui.common.js",
    "module": "dist/cya_vue_ui.esm.js",
    "unpkg": "dist/cya_vue_ui.umd.js",

    main、module 和 unpkg 是让组件库支持不同使用环境的关键配置
    main,moudle,unpkg 配置这些字段是为了指明组件库的不同版本（满足 CommonJS 规范的入口文件，ES Moudle 格式的入口文件 和 UMD 格式的入口文件），他们是打包后文件的路径
    目的在于将来发布后使用者可以根据自己的环境选择合适的版本。发布组件时，手动添加这些字段，并让他们指向正确的打包输出文件，这样打完包之后 会在对应的路径生成不同格式的文件。

    main：指定组件库的入口文件，通常是 CommonJS 格式（用于 Node.js 构建工具）。
    很多传统的构建工具（如 Node.js 环境和一些老旧的构建工具）都支持 CommonJS 模块格式。
    这个字段使得使用你的组件库的开发者可以通过 require('cya_vue_ui') 来导入你的库。
    对于没有配置这个字段的组件库，require 或 import 可能找不到入口文件，导致无法正常使用

    module：指定 ES Module 格式的入口文件，这对于现代构建工具（如 Webpack、Rollup、Vite 等）非常重要，因为它们可以直接使用 ES Module 语法来进行优化。
    ES Module 格式支持更好的 tree shaking（去除未使用的代码）和更高效的构建。
    使用 module 字段可以让这些现代工具直接加载你的组件库并优化打包。
    如果没有配置 module 字段，现代的构建工具可能会退回到 main 字段配置的 CommonJS 格式，可能无法充分优化。

    unpkg：指定 UMD 格式的入口文件，适用于在浏览器中通过 <script> 标签引入时使用。
    UMD 是一个兼容多个模块化环境的格式，既适用于浏览器中通过 <script> 标签引入，也适用于 Node.js 环境。
    当你的组件库被通过 CDN 引入（如使用 unpkg.com）时，这个字段可以帮助浏览器识别并加载正确的文件。
    如果没有配置 unpkg，当用户通过 CDN 引入你的组件库时，可能无法正确加载和运行

2.  进行打包配置 使用 webapack/rollup (这里以 rollup 为了 做打包配置)

            打包工具 rollup 和 webpack 的一些情况对比

            1.  设计理念与主要用途
                Rollup：

                       模块化打包工具，专注于生成 库 和 组件 的打包输出。
                       其核心目标是生成高效、紧凑的打包文件，特别适用于构建 JavaScript 库 或 组件库。
                       Rollup 的重点是生成 ES Module（ESM）格式的代码，这对于现代浏览器和构建工具（如 Vite、Webpack 等）来说具有很高的兼容性和优化潜力。

                Webpack：

                       更为 通用的打包工具，不仅支持 JavaScript 文件的打包，还支持 CSS、图片、字体等资源的打包。
                       适合大型 前端应用程序 的打包，能够处理多种类型的资源和更复杂的构建需求。
                       Webpack 的功能非常强大，通过插件和 loader 可以实现各种自定义需求，适用于各种项目。

             2. 打包优化与输出格式

                Rollup：
                        Tree shaking：Rollup 的 tree shaking（去除未使用代码）做得非常好，能够精确地删除无用的代码，使得打包后的文件非常小。
                        输出格式：Rollup 支持多种输出格式，如 CommonJS、ESM、UMD 等。默认输出是 ES Module 格式，这使得它非常适合用于构建 JS 库和组件。
                        构建速度：Rollup 的构建速度通常比较快，特别是在构建 库 或 组件 时，由于其对 模块系统 的优化，可以减少打包过程中的开销。

                Webpack：
                        Tree shaking：Webpack 在较新的版本（Webpack 2+）也支持 tree shaking，但它的优化效果通常不如 Rollup。
                        Webpack 的优化需要更细致的配置。
                        输出格式：Webpack 更加灵活，支持 CommonJS、ESM、UMD、等多种格式。Webpack 更适合需要多个文件和资源（如图片、CSS、HTML）的应用程序。

               构建速度：Webpack 相比于 Rollup，构建速度可能会稍慢，特别是当项目规模非常大时。

             3. 插件和功能
                  Rollup：

                         相较于 Webpack，Rollup 的插件生态系统较为简单，主要聚焦于 JavaScript 和模块打包，适合库和组件打包。
                         Rollup 的插件系统和配置方式相对简单，但功能不如 Webpack 强大和广泛。
                  Webpack：

                          Webpack 拥有庞大的插件和 loader 生态，几乎支持任何类型的资源和文件（CSS、SASS、LESS、图片、字体、TypeScript、Vue、React 等）。
                          通过插件和 loader 的组合，Webpack 可以处理复杂的构建流程 等。

             4. 配置复杂性
                  Rollup：
                           配置相对简单，尤其适合小型项目或库的打包。Rollup 的配置文件通常较为简洁，易于理解。
                           适合那些对构建过程不需要过多自定义的场景，尤其是库或组件的开发。
                  Webpack：

                           配置较为复杂，尤其是涉及到多种资源（如图片、CSS、TypeScript 等）时，配置可能会比较庞大。
                           Webpack 的灵活性很高，能够满足各种复杂的构建需求，但也意味着配置的复杂度较大。
            5. 使用场景

                  Rollup：
                           适合 构建 JavaScript 库 或 组件库。如果要创建一个共享的、可复用的组件库（如 Vue 组件库），Rollup 是非常合适的选择。
                           如果关注代码优化、模块格式（如 ESM）、输出文件体积小，Rollup 会是更好的选择。
                  Webpack：
                           更适合用于构建 前端应用程序，特别是大型 SPA（单页面应用程序）或复杂的多页面应用程序（MPA）。
                           Webpack 对 资源处理（CSS、图片、字体等）和 开发模式（如热更新、动态加载、代码分割）有非常好的支持。

            6. 构建速度与文件体积
                  Rollup：
                           Rollup 的打包速度和生成的文件体积通常会比 Webpack 更小，特别是当项目的主要目标是生成库时。
                           Rollup 非常擅长去除未使用的代码，减少冗余部分，生成高效的输出。
                  Webpack：
                           Webpack 的构建速度通常比较慢，尤其是对于大规模的前端应用程序。它会生成多个文件（如 CSS、图片、JS 等），适合打包更复杂的项目。

3.  安装 rollup 打包相关依赖
    npm install rollup rollup-plugin-vue2 @rollup/plugin-babel -D
    npm install @babel/preset-env @babel/core rollup-plugin-css-only -D
    依赖安装过程可能会出现依赖版本的兼容问题，根据报错信息 调整安装对应版本即可

    rollup 使用 rollup 打包的核心依赖
    rollup-plugin-vue 用于处理组件库的.vue 文件，将其转换为可以被 Rollup 识别的 JavaScript 文件 。如果当前使用的 vue 版本是 2.x，要安装 rollup-plugin-vue2
    rollup-plugin-babel 将代码通过 Babel 编译，通过 Babel，可以使用现代 JavaScript 语法（如箭头函数、async/await 等），并将其转译为兼容旧浏览器或特定环境的代码。这个插件通常和 @babel/preset-env 一起使用，后者会根据你支持的浏览器自动决定要编译哪些语法特性。目前 rollup-plugin-babel 已经被弃用，并且不再维护。官方推荐使用 @rollup/plugin-babel 来替代 rollup-plugin-babel，同时为了适配 @rollup/plugin-babel 要安装 适当版本的 rollup（版本号在 >=0.60.0 <3）

4.  packages 根目录下建立 rollup.config.js 文件 配置打包相关设置

5.  执行打包命令 查看打包内容

# 打包后的测试

打包后测试打包内容是否可用 组件库根目录下执行 npm link,然后 在当前项目根目录执行 npm link cya_vue_ui（组件库名称） 然后 npm run serve 运行，在本地进行测试

# 发布

测试打包的组件能够正常使用后，可以发布到 npm
具体操作 组件库根目录 登录 npm （终端执行 npm login） 输入账号和密码以及其他验证后 通过 npm publish 发布到 npm
发布时 如果遇到 npm login 报错:Public registration is not allowed，是因为 npm 的镜像源问题（通过 npm get registry 查看自己的镜像源，如果不是 https://registry.npmjs.org 需要修改。将 npm 的镜像源改为 npm config set registry https://registry.npmjs.org，发布完以后，可以再切换回来 npm config set registry https://registry.npmmirror.com（切换回来是为了 避免 npm install 安装依赖时报错）

# 使用

后续使用 通过 npm install cya_vue_ui 安装使用即可

# 后续版本更新和维护

后续组件库如果有更新，更新完成后 变更版本号后重新发布即可
