import { SnakeToRawPipe } from './snake-to-raw.pipe';

describe('SnakeToRawPipe', () => {
  it('create an instance', () => {
    const pipe = new SnakeToRawPipe();
    expect(pipe).toBeTruthy();
  });
});
