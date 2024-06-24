'use client'

import Script from 'next/script'
import { useState } from 'react'

export default function Page() {
  const [rgInterface, setRgInterface] = useState<any>()

  const onScriptReady = () => {
    initializeInAppInterface()
  }
  const initializeInAppInterface = async () => {
    const root = window as any
    if (root && root.RgIapInterface) {
      const rgInterface = new root.RgIapInterface()
      await rgInterface.init()
      setRgInterface(rgInterface)
    }
  }

  return (
    <>
      <Script
        src="https://pcdn2.swing2app.co.kr/swing_public_src/v3/2024_02_28_002/js/swing_app_on_web.js"
        onReady={onScriptReady}
      />
      <Script
        src="https://pcdn2.swing2app.co.kr/swing_public_src/custom_proj/reading_gate_proj/js/reading_gate_inapp_api_handler.js"
        onReady={onScriptReady}
      />
      {rgInterface ? (
        <AndroidProductList rgInterface={rgInterface} />
      ) : (
        <div>Loading</div>
      )}
    </>
  )
}

function AndroidProductList({ rgInterface }: { rgInterface: any }) {
  const ITEMS = [
    {
      id: 'rg-1m-nonsub',
      label: '1개월 이용권',
    },
    {
      id: 'rg-3m-nonsub',
      label: '3개월 이용권',
    },
    {
      id: 'rg-6m-nonsub',
      label: '6개월 이용권',
    },
    {
      id: 'rg-12m-nonsub',
      label: '12개월 이용권',
    },
    // {
    //   id: 'com.a1edu.readinggate_1month',
    //   label: '레거시 1개월',
    // },
  ]
  const SUBSCRIBE_ITEM = 'rg-1m-sub'

  const onClickBuy = (itemId: string) => {
    alert(`결제버튼 클릭: ${itemId}`)
    rgInterface.subscribe(
      itemId,
      'android',
      (returnModel: {
        result: boolean
        purchaseToken: string
        productId: string
      }) => {
        alert(`결제응답: ${itemId} | ${JSON.stringify(returnModel)}`)
        if (returnModel.result) {
          rgInterface.subscribeAcknowledgeForAnd(
            returnModel.purchaseToken,
            returnModel.productId,
            (model: unknown) => {
              alert('model: ' + `${JSON.stringify(model)}`)
            },
          )
        }
      },
    )
  }

  const onClickSubscribe = (itemId: string) => {
    alert(`구독버튼 클릭: ${itemId}`)
    rgInterface.subscribe(
      itemId,
      'android',
      (returnModel: {
        result: boolean
        purchaseToken: string
        productId: string
      }) => {
        alert(`결제응답: ${itemId} | ${JSON.stringify(returnModel)}`)
        if (returnModel.result) {
          rgInterface.subscribeAcknowledgeForAnd(
            returnModel.purchaseToken,
            returnModel.productId,
            (model: unknown) => {
              alert('model: ' + `${JSON.stringify(model)}`)
            },
          )
        }
      },
    )
  }

  return (
    <main>
      <h1>Android 결제 테스트</h1>
      {ITEMS.map((item) => {
        return (
          <div key={item.id}>
            <button onClick={() => onClickBuy(item.id)}>{item.label}</button>
          </div>
        )
      })}
      <hr />
      <div>
        <button onClick={() => onClickSubscribe(SUBSCRIBE_ITEM)}>
          1개월 정기구독
        </button>
      </div>
    </main>
  )
}
