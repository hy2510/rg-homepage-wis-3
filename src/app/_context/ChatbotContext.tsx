'use client'

import React, { useEffect } from 'react'
import { useStudentInfo } from '@/client/store/student/info/selector'
import { Chatbot } from '../_function/chatbot-gitple'
import { useCustomerInfo } from './CustomerContext'

const ChatbotContext = React.createContext<undefined>(undefined)

export default function ChatbotContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { customerId, name: customerName, customerUse } = useCustomerInfo()
  const { loginId, studentId } = useStudentInfo().payload

  useEffect(() => {
    Chatbot.connect(customerId, customerName, customerUse.toLocaleLowerCase())
    return () => {
      Chatbot.disconnect()
    }
  }, [customerId, customerName, customerUse])

  useEffect(() => {
    Chatbot.updateUserInfo(studentId, loginId)
  }, [loginId, studentId])

  return (
    <ChatbotContext.Provider value={undefined}>
      {children}
    </ChatbotContext.Provider>
  )
}

export const useChatbotController = () => {
  return {
    showChat: Chatbot.showChat,
    hideChat: Chatbot.hideChat,
  }
}
