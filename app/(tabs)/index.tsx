import { Text, View } from 'react-native';
import { useStyles } from "@/src/hooks/useStyle";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function TabOneScreen() {
  const { styles, setStyles, getStyles, loading } = useStyles();
  const [stylesLength, setStylesLength] = useState(0);
  const { t } = useTranslation()

  useEffect(() => {
    getStyles().then((res: {}) => {
      setStyles(res)
    }).catch((err: any) => {
      console.log(err)
    })
  }, []);

  if (loading) return (
    <>
      <Text>
        Loading...
      </Text>
    </>
  )
  return (
    <View>
      <Text style={styles.SmallText}>{t("testing.test")}</Text>
    </View>
  );
}
