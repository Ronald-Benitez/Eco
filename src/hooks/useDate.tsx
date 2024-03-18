import { useTranslation } from "react-i18next";

export default function useDate() {
    const { t } = useTranslation()

    const months = [
        t('months.0'),
        t('months.1'),
        t('months.2'),
        t('months.3'),
        t('months.4'),
        t('months.5'),
        t('months.6'),
        t('months.7'),
        t('months.8'),
        t('months.9'),
        t('months.10'),
        t('months.11')
    ]
    const days = [
        t('daysLong.0'),
        t('daysLong.1'),
        t('daysLong.2'),
        t('daysLong.3'),
        t('daysLong.4'),
        t('daysLong.5'),
        t('daysLong.6')
    ]

    const getDay = (date: string) => {
        const day = new Date(date).getDay()
        return days[day]
    }

    const getMonth = (date: string) => {
        const month = new Date(date).getMonth()
        return months[month]
    }

    const getDate = (date: string) => {
        const base = new Date(date)
        const dayIndex = base.getDay()
        const day = base.getDate()
        const month = base.getMonth()
        const year = base.getFullYear()
        return `${days[dayIndex]} ${day} ${months[month]} ${year}`
    }

    return { months, days, getDay, getMonth, getDate }

}