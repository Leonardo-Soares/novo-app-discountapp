import { View } from 'react-native'
import { api } from '../../../service/api'
import { useEffect, useState } from 'react'
import { useNavigate } from '../../../hooks/useNavigate'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HeaderPrimary from '../../../components/header/HeaderPrimary'
import CardProdutoDetalhes from '../../../components/cards/CardProdutoDetalhes'
import MainLayoutAutenticado from '../../../components/layout/MainLayoutAutenticado'

interface PropsOferta {
  id: number
  imagem_cupom: any
  anunciante: string
  codigo_cupom: string
  data_criacao: string
  data_validade: string
  titulo_oferta: string
  imagem_anunciante: any
  vantagem_reais: string
  categoria_cupom: string
  descricao_oferta: string
  quantidade_cupons: number
  cupoms_disponiveis: number
  descricao_completa: string
  vantagem_porcentagem: string
  ativo: string
}

export default function ClienteOfertaDetalheScreen({ route }: { route?: any }) {
  const isFocused = useIsFocused()
  const { navigate } = useNavigate()
  const idOferta = route.params.props.id
  const [loading, setLoading] = useState(true)
  const [oferta, setOferta] = useState<PropsOferta[]>([])

  async function getOfertas() {
    setLoading(true)
    const jsonUsuario = await AsyncStorage.getItem('infos-user')
    if (jsonUsuario) {
      const newJson = JSON.parse(jsonUsuario)
      try {
        const headers = {
          Authorization: `Bearer ${newJson.token}`
        }
        const response = await api.get(`/cupons/${idOferta}`, {
          headers: headers
        })
        setOferta(response.data.results)
      } catch (error: any) {
        console.log(error)
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    getOfertas()
  }, [])

  useEffect(() => {
    if (isFocused) {
      getOfertas()
    }
  }, [isFocused])

  return (
    <MainLayoutAutenticado marginTop={0} marginHorizontal={0} loading={loading}>
      <HeaderPrimary titulo='Detalhe do Anúncio' voltarScreen={() => navigate('ClienteUtilizadosScreen')} />
      <View className='mx-7 mt-5 min-h-full'>

        {oferta && oferta.map((item) => (
          <View key={item.id}>
            <CardProdutoDetalhes
              status={item.ativo}
              codigo_cupom={item.codigo_cupom}
              imagem_cupom={item.imagem_cupom}
              data_validade={item.data_validade}
              titulo_oferta={item.titulo_oferta}
              vantagem_reais={item.vantagem_reais}
              categoria_cupom={item.categoria_cupom}
              descricao_oferta={item.descricao_oferta}
              imagem_anunciante={item.imagem_anunciante}
              quantidade_cupons={item.quantidade_cupons}
              cupoms_disponiveis={item.cupoms_disponiveis}
              descricao_completa={item.descricao_completa}
              vantagem_porcentagem={item.vantagem_porcentagem}
            />
          </View>
        ))}

      </View>
    </MainLayoutAutenticado >
  );
}
