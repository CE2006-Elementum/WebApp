import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { searchRes, valRes } from './testdata.jsx';

export const server = setupServer(
    rest.post('http://127.0.0.1:43325/search', (req, res, ctx) => {
        if(req.body.flat_properties.price_range.max > 0.1)
            return res(ctx.status(200), ctx.json(searchRes));
        else return res(ctx.status(200), ctx.json({blocks: []}));
    }),
    rest.post('http://127.0.0.1:43325/valuation', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(valRes));
    }),
    rest.get('http://127.0.0.1:43325/mapskey', (req, res, ctx) => {
        return res(ctx.status(200));
    }),
    rest.post('http://127.0.0.1:43325/feedback', (req, res, ctx) => {
        return res(ctx.status(200));
    }),
    rest.post('http://127.0.0.1:43325/*', (req, res, ctx) => {
        return rest(ctx.status(404));
    })
)