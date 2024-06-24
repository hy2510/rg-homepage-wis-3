'use client'

const TYPE_PRIVATE_KEY = '6pjPqT5AA13IrguVNyt9Z43VE02zf3'
const TYPE_SCHOOL_KEY = '2wsuXoNxm7i9Z7wdxkWQZflH3k3dl3'
// if ((customerId != "000107") && (customerId != "000830") && (customerId != "002061")) // IREAD-수원정자센터, 로제타스톤코리아, SDA교문리교회 제외
const TYPE_ACADEMY_KEY = 'NL1K46KUR5HOUjMcyhslN2CjwQ3bp3'
const EXECLUSIVE_CUSTOMER = ['000107', '000830', '002061']

const connection: {
  isConnected: boolean
  connectInfo?: {
    customerId: string
    customerName: string
    customerUse: string
  }
  userInfo?: {
    studentId: string
    loginId: string
  }
} = {
  isConnected: false,
  connectInfo: undefined,
  userInfo: undefined,
}

// function connect(
//   customerId: string,
//   customerName: string,
//   customerType: string,
// ): boolean {
//   const nodeList = document.querySelectorAll("script[id='chatbot-init']")
//   if (!nodeList || nodeList.length === 0) {
//     let key: string | undefined = undefined

//     if (customerType === 'private') {
//       key = TYPE_PRIVATE_KEY
//     } else if (customerType === 'school') {
//       key = TYPE_SCHOOL_KEY
//     } else if (customerType === 'academy') {
//       key = TYPE_ACADEMY_KEY
//     }
//     const isAvailableCustomer =
//       !!key && !EXECLUSIVE_CUSTOMER.includes(customerId)
//     if (isAvailableCustomer) {
//       const script = document.createElement('script')
//       script.setAttribute('id', 'chatbot-init')
//       const windowWrap = window as any
//       if (windowWrap.Gitple) {
//         windowWrap.GitpleConfig = {
//           appCode: `${key}`,
//           enableCookie: false,
//           enableGoogleAnalytics: false,
//         }
//         windowWrap.Gitple('boot')
//         document.head.appendChild(script)
//         connection.isConnected = true
//         connection.connectInfo = {
//           customerId,
//           customerName,
//           customerUse: customerType,
//         }
//         return true
//       }
//     }
//   }
//   return false
// }

// function disconnect() {
//   updateUserInfo()
//   const windowWrap = window as any
//   const nodeList = document.querySelectorAll("script[id='chatbot-init']")
//   if (nodeList && nodeList.length > 0) {
//     const script = nodeList[0]
//     if (script) {
//       script.remove()
//       windowWrap.Gitple('shutdown')
//     }
//   }
//   connection.isConnected = false
//   connection.connectInfo = undefined
//   connection.userInfo = undefined
// }

function connect(
  customerId: string,
  customerName: string,
  customerType: string,
): boolean {
  let key: string | undefined = undefined

  if (customerType === 'private') {
    key = TYPE_PRIVATE_KEY
  } else if (customerType === 'school') {
    key = TYPE_SCHOOL_KEY
  } else if (customerType === 'academy') {
    key = TYPE_ACADEMY_KEY
  }
  const isAvailableCustomer = !!key && !EXECLUSIVE_CUSTOMER.includes(customerId)
  if (isAvailableCustomer) {
    const windowWrap = window as any
    if (windowWrap.Gitple) {
      windowWrap.GitpleConfig = {
        appCode: `${key}`,
        enableCookie: false,
        enableGoogleAnalytics: false,
      }
      windowWrap.Gitple('boot')
      connection.isConnected = true
      connection.connectInfo = {
        customerId,
        customerName,
        customerUse: customerType,
      }
      return true
    }
  }

  return false
}

function disconnect() {
  updateUserInfo()
  const windowWrap = window as any
  if (windowWrap && windowWrap.Gitple) {
    windowWrap.Gitple('shutdown')
  }
  connection.isConnected = false
  connection.connectInfo = undefined
  connection.userInfo = undefined
}

function updateUserInfo(userid?: string, loginId?: string) {
  const isConnected = connection.isConnected
  const customerName = connection.connectInfo?.customerName

  const windowWrap = window as any
  if (isConnected && windowWrap && windowWrap.Gitple) {
    if (userid || loginId) {
      windowWrap.Gitple('update', {
        id: userid,
        meta: {
          loginId,
          customerName,
        },
      })
    } else {
      let param: any = undefined
      if (customerName) {
        param = {
          meta: {
            customerName: customerName,
          },
        }
      }
      windowWrap.Gitple('update', param)
    }
  }
}

function showChat() {
  const isConnected = connection.isConnected
  const windowWrap = window as any

  if (isConnected && windowWrap && windowWrap.Gitple) {
    windowWrap.Gitple('open')
  }
}

function hideChat() {
  const isConnected = connection.isConnected
  const windowWrap = window as any

  if (isConnected && windowWrap && windowWrap.Gitple) {
    windowWrap.Gitple('close')
  }
}

export const Chatbot = {
  connect,
  disconnect,
  updateUserInfo,
  showChat,
  hideChat,
}
