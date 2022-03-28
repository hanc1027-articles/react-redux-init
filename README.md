# 初始化React Redux

## 說明/特色
- 用於集中管理狀態、不同組件間可互通資料
- 現在比較流行的套件組合為：React Redux + Redux Toolkit
- Redux Toolkit：為一個更有效率撰寫 Redux 的 library
- 重點API：Store、Actions、Reducers

## 步驟
1. 新增React Redux 及 Redux Toolkit至Project
   1. `npm install @reduxjs/toolkit react-redux`
2. 建立Redux Store
   1. 創建 `src/store/index.js`
   2. 從Redux Toolkit引入 `configureStore` API
   ```js
   import { configureStore } from '@reduxjs/toolkit'

    export const store = configureStore({
        reducer: {},
    })
   ```
   3. 此舉目的為，Redux能配置Redux DevTools extension
3. 將Redux於Project激活
   1. 於`src/index.js`中，引入Redux的`<Provider>`
   ```js
    import React from 'react'
    import ReactDOM from 'react-dom'
    import './index.css'
    import App from './App'
    import { store } from './store/index'
    import { Provider } from 'react-redux'

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    )
   ```
4. 創建Redux State Slice
   1. 創建`src/features/colorSlice.js`
   2. 從Redux Toolkit引入 `createSlice` API
   3. 創建Slice必要元素
      1. String name：用於辨識slice
      2. Initial state value
      3. One or more reducer functions：定義方法
   4. Export the `generated Redux action creators` and the `reducer function` for the whole slice.
    ```js
    import { createSlice } from '@reduxjs/toolkit'

    const initialState = {
        color_index:0,
        color_list: ["#E09200","#FFA1A1","#C7C400","#009400","#00B2B2","#6E6EFF"],
        bgColorCode:"#E09200"
    }

    export const colorSlice = createSlice({
      name: 'color',
      initialState,
      reducers: {
        next: (state) => {
            if(state.color_index >= 5){
                state.color_index = 0;
            }else{
                state.color_index += 1;
            }
            state.bgColorCode = state.color_list[state.color_index]
        },
        previous: (state) => {
          if(state.color_index <= 0){
                state.color_index = 5;
            }else{
                state.color_index -= 1;
            }
            state.bgColorCode = state.color_list[state.color_index]
        },
        changeByColorCode: (state, action) => {
          state.bgColorCode = action.payload
        },
      },
    })

    // Action creators are generated for each case reducer function
    export const { next, previous, changeByColorCode } = colorSlice.actions

    export default colorSlice.reducer
    ```
5. 註冊Slice Reducers至Store (src/store/index.js)
   ```js
    import { configureStore } from '@reduxjs/toolkit'
    import colorReducer from '../features/colorSlice'

    export const store = configureStore({
      reducer: {
        color: colorReducer,
      },
    })
   ```
6. 於React Components中使用Redux State and Actions 
   1. 使用 `useSelector` read data
   2. 使用 `useDispatch` dispatch actions
   ```jsx
   // src/App.jsx
    import { useState } from 'react'
    import "./App.css"
    import { useSelector, useDispatch } from 'react-redux'
    import { next, previous, changeByColorCode } from './features/colorSlice'

    export default function App() {
        const bgColor = useSelector((state) => state.color.bgColorCode)
        const dispatch = useDispatch()
        const [inputColor, setInputColor] = useState(bgColor);

        return (
            <div className="App">
              <header className='App-header' style={{ backgroundColor: bgColor}}>
                <button
                  onClick={() => dispatch(previous())}
                >
                  Previous
                </button>
                <button
                  onClick={() => dispatch(next())}
                >
                  Next
                </button>

                <hr/>

                <input type="text" value={inputColor} onChange={(event) => setInputColor(event.target.value)}></input>
                <button
                  onClick={() => dispatch(changeByColorCode(inputColor))}
                >
                  ChangeColor
                </button>
              </header>
            </div>
        )
    }
   ```

<!-- ## 與Vuex比較 -->

## 範例
### Clone此專案
`git clone https://github.com/hanc1027-articles/react-redux-init.git`
### 安裝套件
`npm install`
### 執行專案
`npm run start`

