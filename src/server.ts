import express from 'express'
import { getPayloadClient } from './getPayloadClient'
import { nextApp,nexthandler } from './next-utils'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from './trpc'
import { inferAsyncReturnType } from '@trpc/server'
import nextBuild from 'next/dist/build'
import path from 'path'
import { PayloadRequest } from 'payload/types'
import { parse } from 'url'


const app = express()

const PORT = Number(process.env.PORT) || 3000

const createContext = ({req, res}: trpcExpress.CreateExpressContextOptions) => ({
    req, 
    res
})

export type ExpressContext = inferAsyncReturnType<typeof createContext>

const start = async () => {


    const payload = await getPayloadClient({
        initOptions:{
            express: app,
            onInit: async (cms) => {
                cms.logger.info(`payload Admin url: ${cms.getAdminURL()}`)
            }
        }
    })

    if (process.env.NEXT_BUILD) {
        app.listen(PORT, async () => {
          payload.logger.info(
            'Next.js is building for production'
          )
    
          // @ts-expect-error
          await nextBuild(path.join(__dirname, '../'))
    
          process.exit()
        })
    
        return
      }

      const cartRouter = express.Router()

      cartRouter.use(payload.authenticate)
    
      cartRouter.get('/', (req, res) => {
        const request = req as PayloadRequest
    
        if (!request.user)
          return res.redirect('/sign-in?origin=cart')
    
        const parsedUrl = parse(req.url, true)
        const { query } = parsedUrl
    
        return nextApp.render(req, res, '/cart', query)
      })
    
      app.use('/cart', cartRouter)

 
    app.use('/api/trpc', trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext
    }))

   app.use((req, res) => nexthandler(req,res))

   
   nextApp.prepare().then(() => {
    payload.logger.info('next.js starter')

    app.listen(PORT, async () => {
        payload.logger.info('next.js app url')
    })
})
   
}

start()
module.exports = app;

