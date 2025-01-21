import MenuItem from './MenuItem'
import { Text, View, Modal } from 'react-native'
import { useEffect, useState } from 'react'
import { colors } from '../../../styles/colors'
import { useNavigate } from '../../../hooks/useNavigate'
import { CommonActions } from '@react-navigation/native'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { useGlobal } from '../../../context/GlobalContextProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ModalTemplateCateirinha from '../../../components/Modals/ModalTemplateCateirinha'

export function CustomDrawerContent(props: any) {
  const { navigate, dispatch } = useNavigate()
  const [associado, setAssociado] = useState('')
  const { tipoUser, setUsuarioLogado } = useGlobal()
  const [modalCarteirinha, setModalCarteirinha] = useState(false)

  function handleLogout() {
    AsyncStorage.setItem('infos-user', '')
    setUsuarioLogado(false)
    dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'LoginScreen' },
        ],
      })
    );
  }

  async function getStorage() {
    const jsonValue = await AsyncStorage.getItem('dados-perfil')
    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)
      setAssociado(newJson.associacao_id)
    }
  }

  useEffect(() => {
    getStorage()
  }, [])

  return (
    <>
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.6)', marginTop: 0, paddingTop: 0 }}>
        <View className='p-3 mr-4 rounded-r-3xl flex-1' style={{ backgroundColor: '#F7F2F9' }} >

          <View className='pl-4 py-2 pr-2 mb-8'>
            <Text
              style={{ color: '#49454f' }}
              className='text-base font-medium leading-6'
            >Discontapp</Text>
          </View>

          {tipoUser === 'Anunciante' ?
            <>
              <MenuItem
                onPress={() => navigate('ClientePacotesScreen')}
                titulo='Tipos de Pacotes'
                icon={require('../../../../assets/img/icons/cart.png')}
              />
              <MenuItem
                onPress={() => navigate('ClienteConsumoScreen')}
                titulo='Meu Consumo'
                icon={require('../../../../assets/img/icons/money.png')}
              />
              <MenuItem
                onPress={() => navigate('ClientePerfilScreen')}
                titulo='Perfil'
                icon={require('../../../../assets/img/icons/perfil-menu.png')}
              />
              {/* <MenuItem
                titulo='Localização'
                onPress={() => navigate('ClienteAtualizaLocal')}
                icon={require('../../../../assets/img/icons/estabelecimento.png')}
              /> */}
              <MenuItem
                onPress={() => navigate('DocumentosScreen')}
                titulo='Documentos'
                icon={require('../../../../assets/img/icons/doc.png')}
              />
              <MenuItem
                onPress={() => navigate('ContatosScreen')}
                titulo='Contato'
                icon={require('../../../../assets/img/icons/faq.png')}
              />
              <MenuItem
                onPress={() => navigate('FaqScreen')}
                titulo='FAQ'
                icon={require('../../../../assets/img/icons/question-out.png')}
              />
              <MenuItem
                onPress={() => navigate('ConfiguracoesScreen')}
                titulo='Configurações'
                icon={require('../../../../assets/img/icons/settings.png')}
              />
              <MenuItem
                onPress={() => navigate('OnBoardingScreen')}
                titulo='Tutorial'
                icon={require('../../../../assets/img/icons/tutorial-menu.png')}
              />
              <MenuItem
                onPress={handleLogout}
                titulo='Sair'
                icon={require('../../../../assets/img/icons/logout.png')}
              />
            </>
            :
            <>
              {/* {associado && associado !== '-' && */}
              <View className=' rounded-2xl' style={{ backgroundColor: colors.secondary80 }}>
                <MenuItem
                  titulo='Discontoken'
                  onPress={() => navigate('DisconTokenScreen')}
                  icon={require('../../../../assets/img/icons/star-discontoken.png')}
                />
              </View>
              {/* } */}
              <MenuItem
                onPress={() => navigate('SugerirEstabelecimentosScreen')}
                titulo='Sugerir Estabelecimentos'
                icon={require('../../../../assets/img/icons/estabelecimento.png')}
              />
              <MenuItem
                onPress={() => navigate('ConfiguracoesScreen')}
                titulo='Configurações'
                icon={require('../../../../assets/img/icons/settings.png')}
              />
              <MenuItem
                onPress={() => navigate('DocumentosScreen')}
                titulo='Documentos'
                icon={require('../../../../assets/img/icons/doc.png')}
              />
              <MenuItem
                onPress={() => navigate('ContatosScreen')}
                titulo='Contato'
                icon={require('../../../../assets/img/icons/faq.png')}
              />
              <MenuItem
                onPress={() => navigate('FaqScreen')}
                titulo='FAQ'
                icon={require('../../../../assets/img/icons/question-out.png')}
              />
              <MenuItem
                onPress={() => navigate('Perfil')}
                titulo='Perfil'
                icon={require('../../../../assets/img/icons/perfil-menu.png')}
              />
              <MenuItem
                onPress={() => navigate('OnBoardingScreen')}
                titulo='Tutorial'
                icon={require('../../../../assets/img/icons/tutorial-menu.png')}
              />
              <MenuItem
                onPress={handleLogout}
                titulo='Sair'
                icon={require('../../../../assets/img/icons/logout.png')}
              />
            </>

          }
        </View>
      </DrawerContentScrollView>

      <ModalTemplateCateirinha visible={modalCarteirinha} onClose={() => setModalCarteirinha(false)} />
    </>
  );
}
