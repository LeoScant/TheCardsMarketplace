import {get} from '@loopback/rest';

export class HealthController {
  constructor() {}

  @get('/health')
  async ping(): Promise<{status: string; timestamp: string}> {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
