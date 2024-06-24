'use client'

import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { Modal } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'set_filter'

export interface LibraryFilterOption {
  group: string
  title: string
  option: { id: string; label: string; enabled: boolean }[]
}

export default function LibrarySearchFilter({
  optionList: propsOptionList,
  onOptionChange,
}: {
  optionList: LibraryFilterOption[]
  onOptionChange?: (newOptions: LibraryFilterOption[]) => void
}) {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const [optionList, setOptionList] = useState(propsOptionList)
  const [isShowModal, setShowModal] = useState(false)

  useEffect(() => {
    setOptionList(propsOptionList)
  }, [propsOptionList])

  const activationOptionList = optionList
    .filter((list) => list.option.filter((option) => option.enabled).length > 0)
    .map((list) => {
      const enabledOption = list.option.filter((option) => option.enabled)
      return enabledOption[0].label
    })

  const onModalClose = () => {
    const isOptionChange = isOptionChanged()
    if (isOptionChange && onOptionChange) {
      onOptionChange(optionList)
    }
    setShowModal(false)
  }

  const onGroupOptionItemChange = useCallback(
    (group: string, id: string) => {
      const newOptions = [
        ...optionList.map((item) => ({
          ...item,
          option: [...item.option.map((item) => ({ ...item }))],
        })),
      ]
      newOptions.forEach((opt) => {
        if (opt.group === group) {
          const list = opt.option
          list.forEach((item) => {
            item.enabled = item.id === id
          })
        }
      })
      setOptionList(newOptions)
    },
    [optionList],
  )

  const isOptionChanged = () => {
    let isChanged = false
    for (let i = 0; i < propsOptionList.length; i++) {
      const originGroup = propsOptionList[i]
      const newGroup = optionList.find((opt) => opt.group === originGroup.group)
      if (newGroup) {
        for (let j = 0; j < originGroup.option.length; j++) {
          const originOpt = originGroup.option.filter((o) => o.enabled)
          if (originOpt.length > 0) {
            const newOpt = newGroup.option.filter((o) => o.enabled)
            if (newOpt.length === 0 || originOpt[0].id !== newOpt[0].id) {
              isChanged = true
              break
            }
          }
        }
      }
      if (isChanged) {
        break
      }
    }
    return isChanged
  }

  return (
    <>
      <div className={style.set_filter}>
        <div className={style.filter_items}>
          {activationOptionList.map((item) => {
            return <SelectedFilterItem key={`Selected_${item}`} label={item} />
          })}
        </div>
        <div
          className={style.filter_button}
          onClick={() => {
            setShowModal(true)
          }}>
          <Image
            alt=""
            src="/src/images/filter-icons/filter_blue.svg"
            width={20}
            height={20}
          />
          <div className={style.txt_l}>{t('t526')}</div>
        </div>
      </div>
      {isShowModal && (
        <Modal
          compact
          header
          title={t('t527')}
          onClickDelete={onModalClose}
          onClickLightbox={onModalClose}>
          <div className={style.set_filter_modal}>
            {optionList.map((list) => {
              return (
                <FilterOptionGroup
                  key={list.title}
                  option={list}
                  onOptionChange={onGroupOptionItemChange}
                />
              )
            })}
          </div>
        </Modal>
      )}
    </>
  )
}

// 선택된 필터 아이템
function SelectedFilterItem({ label }: { label: string }) {
  const style = useStyle(STYLE_ID)
  return <div className={style.filter_item}>{label}</div>
}

// 설정 옵션 그룹
function FilterOptionGroup({
  option,
  onOptionChange,
}: {
  option: LibraryFilterOption
  onOptionChange?: (group: string, id: string) => void
}) {
  const style = useStyle(STYLE_ID)

  const groupClassName = style.row_d
  return (
    <div className={groupClassName}>
      <div className={style.txt_h}>{option.title}</div>
      <div className={style.items}>
        {option.option.map((item) => {
          return (
            <SetFilterItem
              key={item.id}
              label={item.label}
              active={item.enabled}
              onClick={() =>
                onOptionChange && onOptionChange(option.group, item.id)
              }
            />
          )
        })}
      </div>
    </div>
  )
}

// 필터 설정 아이템
function SetFilterItem({
  active,
  label,
  onClick,
}: {
  active?: boolean
  label?: string
  onClick?: () => void
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div
      className={`${style.set_filter_item} ${active && style.active}`}
      onClick={onClick}>
      {label}
    </div>
  )
}
