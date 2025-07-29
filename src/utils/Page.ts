import { ContentScriptContext } from "wxt/client";
import { FormLocator, ImageLocator, InputLocator, Locator } from "./Locator";

export class Page {
  private readonly delay: number;
  private readonly retry: number;
  private readonly context: ContentScriptContext;
  private readonly url: URL;

  constructor(
    context: ContentScriptContext,
    url: URL,
    options?: { delay?: number; retry?: number },
  ) {
    this.delay = options?.delay ?? 100;
    this.retry = options?.retry ?? 100;
    this.context = context;
    this.url = url;
  }

  public q<T extends HTMLElement>(selector: string) {
    return new Locator<T>(selector);
  }

  public input(selector: string) {
    return new InputLocator(selector);
  }

  public button(selector: string) {
    return new Locator<HTMLButtonElement>(selector);
  }

  public form(selector: string) {
    return new FormLocator(selector);
  }

  public image(selector: string) {
    return new ImageLocator(selector);
  }

  public setInterval(fn: () => void, delay: number) {
    return setInterval(fn, delay);
  }

  public setTimeout(fn: () => void, delay: number) {
    return setTimeout(fn, delay);
  }
}
