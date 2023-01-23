import { GetServerSideProps, NextPage } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/products',
      statusCode: 301,
    },
  }
}

const HomePage: NextPage = () => {
  return <></>
}

export default HomePage
