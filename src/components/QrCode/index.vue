<template>
  <img ref="imgRef" />
</template>

<script setup lang="ts">
import QRcode from 'qrcodejs2-fix'

const props = defineProps({
  text: { type: String, required: true, default: '' },
  size: { type: Number, default: 100 },
  logo: { type: String, default: '' },
  logoSize: { type: Number, default: 30 },
  logoPadding: { type: Number, default: 5 },
  colorDark: { type: String, default: '#000000' },
  colorLight: { type: String, default: '#ffffff' },
  correctLevel: { type: Number, default: 2 }
})

const qrCode = ref<HTMLElement>()
const imgRef = ref()
const createCode = () => {
  //创建原始二维码DOM
  return new Promise<void>((resolve) => {
    var element = document.createElement('div')
    new QRcode(element, {
      text: props.text,
      width: props.size,
      height: props.size,
      colorDark: props.colorDark,
      colorLight: props.colorLight,
      correctLevel: props.correctLevel
    })
    if (element.getElementsByTagName('canvas')[0]) {
      qrCode.value = element
      resolve()
    }
  })
}
const drawLogo = () => {
  //绘制LOGO
  return new Promise<void>((resolve) => {
    const logo = new Image()
    logo.src = props.logo
    const logoPos = (props.size - props.logoSize) / 2
    const rectSize = props.logoSize + props.logoPadding
    const rectPos = (props.size - rectSize) / 2
    const ctx = qrCode.value?.getElementsByTagName('canvas')[0].getContext('2d')
    logo.onload = () => {
      ctx?.fillRect(rectPos, rectPos, rectSize, rectSize)
      ctx?.drawImage(logo, logoPos, logoPos, props.logoSize, props.logoSize)
      resolve()
    }
  })
}
const draw = async () => {
  await createCode()
  if (props.logo) {
    await drawLogo()
  }
  imgRef.value.src = qrCode.value
    ?.getElementsByTagName('canvas')[0]
    .toDataURL('image/png')
}
onMounted(() => {
  draw()
})
watch(
  () => props.text,
  () => {
    draw()
  }
)
</script>
