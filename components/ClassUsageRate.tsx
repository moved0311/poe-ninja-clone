import { ClassUsageRate, ClassProps } from '../interfaces'
import styled from 'styled-components'
import { Colors } from '../assets/Colors'

type Props = {
  data: ClassProps
}
type LayoutProps = {
  data: ClassUsageRate
}
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`
const LayoutContainer = styled.div`
  width: calc(100% / 19 - 2px);
  height: 80px;
  margin-right: 2px;
  position: relative;
`
const Avatar = styled.img`
  width: 100%;
  height: 63px;
`
const Title = styled.div`
  height: 17px;
  width: 100%;
  background: ${Colors.BLACK};
  color: ${Colors.WHITE};
  font-size: 12px;
  display: flex;
  align-items: center;
  overflow: hidden;
`
const Rate = styled.div`
  background: ${Colors.RATEBACKGROUD};
  font-size: 12px;
  color: ${Colors.WHITE};
  height: 20px;
  width: 27px;
  line-height: 20px;
  text-align: center;
  position: absolute;
  right: 0;
  bottom: 0;
`

const ClassUsageRateLayout = ({ data }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Title>{data.class}</Title>
      <Avatar src={`/${data.class}_avatar.png`} />
      <Rate>{data.rate}%</Rate>
    </LayoutContainer>
  )
}
const ClassUsageRateComponent = ({ data }: Props) => {
  let entries = Object.entries(data)
  let sorted = entries.sort((a, b) => b[1] - a[1])
  return (
    <Container>
      {sorted.map((arr, idx) => {
        let useRate = { class: arr[0], rate: arr[1] }
        return <ClassUsageRateLayout data={useRate} key={idx} />
      })}
    </Container>
  )
}
export default ClassUsageRateComponent
