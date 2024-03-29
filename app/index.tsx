import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

import useStyles from '@/src/hooks/useStyle'
import Loading from '@/src/components/basics/loading'

const index = () => {
    const { styles, loading, getStyles, setStyles, reloadColors } = useStyles()

    useEffect(() => {
        getStyles().then((res: any) => {
            setStyles(res)
        })
        reloadColors()
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <View>
            <Text>index</Text>
        </View>
    )
}

export default index