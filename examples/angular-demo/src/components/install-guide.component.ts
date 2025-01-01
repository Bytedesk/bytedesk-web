import { Component } from '@angular/core';

@Component({
  selector: 'app-install-guide',
  template: `
    <div style="margin-top: 40px; max-width: 800px">
      <h2>Installation Steps</h2>
      
      <div style="margin-bottom: 20px">
        <h3>1. Install Dependencies</h3>
        <pre style="background: #f5f5f5; padding: 15px; border-radius: 4px">
npm install bytedesk-web
# or
yarn add bytedesk-web</pre>
      </div>

      <div style="margin-bottom: 20px">
        <h3>2. Import Component</h3>
        <pre style="background: #f5f5f5; padding: 15px; border-radius: 4px">
import &#123; BytedeskAngular &#125; from 'bytedesk-web/angular';
import type &#123; BytedeskConfig &#125; from 'bytedesk-web/angular';</pre>
      </div>

      <div style="margin-bottom: 20px">
        <h3>3. Configure Parameters</h3>
        <pre style="background: #f5f5f5; padding: 15px; border-radius: 4px">
const config: BytedeskConfig = &#123;
  baseUrl: 'https://ai.bytedesk.com',
  placement: 'bottom-right',
  marginBottom: 20,
  marginSide: 20,
  chatParams: &#123;
    org: 'your_org_id',  // Replace with your organization ID
    t: "2",
    sid: 'your_sid'      // Replace with your SID
  &#125;
&#125;;</pre>
      </div>

      <div style="margin-bottom: 20px">
        <h3>4. Use Component</h3>
        <pre style="background: #f5f5f5; padding: 15px; border-radius: 4px">
@Component(&#123;
  template: \`
    &lt;bytedesk-angular [config]="config"&gt;&lt;/bytedesk-angular&gt;
    &lt;button (click)="showChat()"&gt;Open Chat&lt;/button&gt;
  \`
&#125;)
export class AppComponent &#123;
  config = &#123;
    // ... configuration
  &#125;;

  showChat() &#123;
    (window as any).bytedesk?.showChat();
  &#125;
&#125;</pre>
      </div>

      <div>
        <h3>5. Available Methods</h3>
        <ul style="line-height: 1.6">
          <li><code>(window as any).bytedesk?.showChat()</code> - Show chat window</li>
          <li><code>(window as any).bytedesk?.hideChat()</code> - Hide chat window</li>
        </ul>
      </div>
    </div>
  `
})
export class InstallGuide {} 