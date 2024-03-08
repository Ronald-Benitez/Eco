import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'

import useStyles from '@/src/hooks/useStyle'
import ModalBase from '@/src/components/ui/base-modal'
import ManageData from '@/src/components/giveaways/manage-data'
import DataBlock from '@/src/components/giveaways/data-block'
import Confirm from '@/src/components/ui/confirm'
import useToast from '@/src/components/ui/useToast'
import Button from '@/src/components/ui/button'

const Giveaway = () => {
  const { styles } = useStyles()
  const [participants, setParticipants] = useState<any[]>([])
  const [awards, setAwards] = useState<any[]>([])
  const [winners, setWinners] = useState<any[]>([])
  const { ToastContainer, showToast } = useToast()
  const { CustomModal, hideModal, showModal } = ModalBase(false)
  const { t } = useTranslation()


  const handleAdd = (arr: string, value: string) => {
    switch (arr) {
      case 'participants':
        if (veriFyRepeated(participants, value, t("giveaway.participantAlreadyExists"))) return
        setParticipants([...participants, value])
        break
      case 'awards':
        if (veriFyRepeated(awards, value, t("giveaway.awardAlreadyExists"))) return
        setAwards([...awards, value])
        break
      case 'winners':
        setWinners([...winners, arr])
        break
    }
  }

  const handleDelete = (arr: string, index: number) => {
    switch (arr) {
      case 'participants':
        const updatedParticipants = [...participants]
        updatedParticipants.splice(index, 1)
        setParticipants(updatedParticipants)
        break
      case 'awards':
        const updatedAwards = [...awards]
        updatedAwards.splice(index, 1)
        setAwards(updatedAwards)
        break
      case 'winners':
        const updatedWinners = [...winners]
        updatedWinners.splice(index, 1)
        setWinners(updatedWinners)
        break
    }
  }

  const veriFyRepeated = (arr: any[], value: string, message: string) => {
    const repeated = arr.some((item) => item === value)
    if (repeated) {
      showToast({ message, type: "ERROR" })
    }
    return repeated
  }

  const handleSort = () => {
    const participantsLength = participants.length
    const awardsLength = awards.length

    if (!participantsLength || !awardsLength) {
      showToast({ message: t("giveaway.noParticipantsOrAwards"), type: "ERROR" })
      return
    }

    if (participantsLength < awardsLength) {
      showToast({ message: t("giveaway.moreParticipantsThanAwards"), type: "ERROR" })
      return
    }

    chooseWinners(awardsLength)
  }

  const chooseWinners = (awardsLength: number) => {
    const winners = []
    const participantsCopy = [...participants]
    const awardsCopy = [...awards]

    for (let i = 0; i < awardsLength; i++) {
      const randomIndex = Math.floor(Math.random() * participantsCopy.length)
      const winner = {
        participant: participantsCopy[randomIndex],
        award: awardsCopy[i]
      }
      winners.push(winner)
      participantsCopy.splice(randomIndex, 1)
    }
    setWinners(winners)
    if (winners.length > 0) showModal()
  }

  const resetWinners = () => {
    setWinners([])
    hideModal()
  }

  const handleClear = () => {
    setParticipants([])
    setAwards([])
    setWinners([])
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.col}>
          <ManageData placeholder={t("giveaway.participants")} handleAdd={handleAdd} arr='participants' />
          <ManageData placeholder={t("giveaway.awards")} handleAdd={handleAdd} arr='awards' />
        </View>
      </View>
      <ScrollView style={{ marginBottom: 50, width: "100%" }}  >
        <View style={styles.row} >
          <View style={[styles.col, { width: "45%", height: "100%" }]}  >
            <DataBlock title={t("giveaway.participants")} data={participants} handleDelete={handleDelete} arr="participants" />
          </View>
          <View style={[styles.col, { width: "45%", height: "100%" }]} >
            <DataBlock title={t("giveaway.awards")} data={awards} handleDelete={handleDelete} arr='awards' />
          </View>
        </View>
      </ScrollView>
      {
        participants.length > 0 && awards.length > 0 && (
          <View style={styles.fixedBottom}>
            <Button onPress={handleSort}>
              <Ionicons name="play-outline" size={24} color="black" />
            </Button>
            <Confirm title="Clear" message={t("giveaway.confirmClear")} onConfirm={handleClear}>
              <Button onPress={() => { }}>
                <Ionicons name="trash-bin-outline" size={24} color="black" />
              </Button>
            </Confirm>
          </View>
        )}
      <ToastContainer />
      {winners.length !== 0 && (
        <CustomModal title={t("giveaway.winners")} button={<Text />} >

          <View style={styles.col}>
            <View style={styles.row}>
              <Text style={styles.text}>{t("giveaway.participants")}</Text>
              <Text style={styles.text}>{t("giveaway.awards")} </Text>
            </View>
            {
              winners.map((winner, index) => (
                <View key={index} style={[styles.horizontalBlock]}>
                  <Text style={[styles.text, { marginLeft: 10, maxWidth: "45%" }]}>{winner.participant}</Text>
                  <Text style={[styles.text, { marginRight: 10, maxWidth: "45%" }]}>{winner.award}</Text>
                </View>
              ))
            }
            <Pressable style={styles.enfasizedButton} onPress={resetWinners}>
              <Text style={styles.text}>{t("giveaway.close")} </Text>
            </Pressable>
          </View>

        </CustomModal>
      )}
    </View>
  )
}

export default Giveaway