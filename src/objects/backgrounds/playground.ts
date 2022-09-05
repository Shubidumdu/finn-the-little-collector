import { GameObject } from '..';
import canvas, { DrawFunc, drawLayer } from '../../canvas';

export default class Playground implements GameObject {
  constructor() {};

  #draw = drawLayer(canvas.get('bg'));

  init = () => {};

  update = (time: DOMHighResTimeStamp) => {
    this.#draw((context, canvas) => {
      // 하늘
      context.beginPath();
      context.setTransform(1, 0, 0, 1, 0, 0);
      const grad1 = context.createLinearGradient(0, 0, 0, innerHeight / 3);
      grad1.addColorStop(0, '#afe8f8');
      grad1.addColorStop(.4, '#fff');
      grad1.addColorStop(.5, '#fff');
      grad1.addColorStop(1, '#cff7fd');
      context.fillStyle = grad1;
      context.fillRect(0, 0, canvas.width, 200);
      context.closePath();

      // 구령대
      context.setTransform(1, 0, 0, 1, 0, 120);
      context.beginPath();
      context.fillStyle = '#e3e5eb';
      context.fillRect(0, 0, canvas.width, 35);
      context.transform(1, 0, 0, 1, 0, 35);
      context.fillStyle = '#d0d2d9';
      context.fillRect(0, 0, canvas.width, 5);
      context.transform(1, 0, 0, 1, 0, 5);
      context.fillStyle = '#e3e5eb';
      context.fillRect(0, 0, canvas.width, 35);
      context.transform(1, 0, 0, 1, 0, 35);
      context.fillStyle = '#d0d2d9';
      context.fillRect(0, 0, canvas.width, 5);
      context.transform(1, 0, 0, 1, 0, 5);
      context.fillStyle = '#e3e5eb';
      context.fillRect(0, 0, canvas.width, 35);
      context.transform(1, 0, 0, 1, 0, 35);
      context.fillStyle = '#d0d2d9';
      context.fillRect(0, 0, canvas.width, 5);
      context.closePath();

      context.setTransform(1.3, 0, 0, 1.3, canvas.width / 2 - 344, -40);
      this.#drawPlatform(context);

      // 트랙
      context.beginPath();
      context.setTransform(1, 0, 0, 1, 0, 240);
      context.fillStyle = '#dc5349';
      context.fillRect(0, 0, canvas.width, 20);
      context.transform(1, 0, 0, 1, 0, 20);
      context.fillStyle = '#fff';
      context.fillRect(0, 0, canvas.width, 4);
      context.transform(1, 0, 0, 1, 0, 4);
      context.fillStyle = '#dc5349';
      context.fillRect(0, 0, canvas.width, 25);   
      context.transform(1, 0, 0, 1, 0, 25);
      context.fillStyle = '#fff';
      context.fillRect(0, 0, canvas.width, 6);
      context.transform(1, 0, 0, 1, 0, 6);
      context.fillStyle = '#dc5349';
      context.fillRect(0, 0, canvas.width, 30);   
      context.transform(1, 0, 0, 1, 0, 30);
      context.fillStyle = '#fff';
      context.fillRect(0, 0, canvas.width, 8);
      context.transform(1, 0, 0, 1, 0, 8);
      context.fillStyle = '#dc5349';
      context.fillRect(0, 0, canvas.width, 35);   
      context.transform(1, 0, 0, 1, 0, 35);
      context.fillStyle = '#fff';
      context.fillRect(0, 0, canvas.width, 10);
      context.transform(1, 0, 0, 1, 0, 10);
      context.fillStyle = '#dc5349';
      context.fillRect(0, 0, canvas.width, 40);   
      context.transform(1, 0, 0, 1, 0, 40);
      context.fillStyle = '#fff';
      context.fillRect(0, 0, canvas.width, 10);

      // 잔디
      context.transform(1, 0, 0, 1, 0, 10);
      context.fillStyle = '#a4b672';
      context.fillRect(0, 0, canvas.width, canvas.height - 280);
      context.transform(1, 0, 0, 1, 0, 100);
      context.strokeStyle = '#fff';
      context.lineWidth = 10;
      context.strokeRect(-10, 0, canvas.width + 20, canvas.height / 2 + 40);
      context.closePath();

      context.lineWidth = 1;
      context.strokeStyle = '#000';

      // person 이동 영역
      context.setTransform(1, 0, -0.5, 1, canvas.width / 2 - 280, 240);
      context.beginPath();
      context.strokeRect(0, 0, 800, 600);
      context.closePath();

      // 가랜드
      const delta1 = Math.sin(time / 200);
      context.setTransform(1, 0, 0, 1, 0 + delta1, -120);
      this.#drawGarland(context);
      context.scale(-1, 1);
      context.transform(1, 0, 0, 1, -canvas.width, 0);
      this.#drawGarland(context);
    });
  };

  remove = () => {
    this.#draw((context, canvas) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    });
  };

  #drawGarland: DrawFunc = (context) => {
    context.fillStyle = '#F17575';
    context.fill(
      new Path2D('M81 377.5L99 297.886C74.45 298.657 49.1148 298.381 23 296.994L81 377.5Z'),
    );
    context.fillStyle = '#F1BF75';
    context.fill(
      new Path2D('M148.5 294.837L201.5 351L212.5 286.108C191.865 289.865 170.53 292.792 148.5 294.837Z'),
    );
    context.fillStyle = '#D1F175';
    context.fill(
      new Path2D('M244 279.609L293 322.5L296.5 265.125C279.582 270.588 262.081 275.43 244 279.609Z'),
    );
    context.fillStyle = '#75F1DB';
    context.fill(
      new Path2D('M331 252.82L368.5 288.5L372.79 234.5C359.33 241.062 345.399 247.178 331 252.82Z'),
    );
    context.fillStyle = '#75AEF1';
    context.fill(
      new Path2D('M399.6 220.5L436 245.5V198.207C424.324 206.032 412.19 213.472 399.6 220.5Z'),
    );
    context.fillStyle = '#BA75F1';
    context.fill(
      new Path2D('M465 177.266L506.5 204L493.342 153.5C484.271 161.703 474.822 169.632 465 177.266Z'),
    );
    context.fillStyle = '#F175D6';
    context.fill(
      new Path2D('M522 125.367L547 146.5L541.5 103.266C535.255 110.795 528.754 118.166 522 125.367Z'),
    );
    context.fillStyle = '#F5F5F5';
    context.fill(
      new Path2D('M560.718 78.5L585.5 90.5L573 60.7342C569.048 66.7344 564.953 72.6578 560.718 78.5Z'),
    );
    context.stroke(
      new Path2D('M607.5 0.5C561.745 98.0582 483.215 181.408 373.29 235L331.5 253.32C239.897 289.209 129.347 305.885 0.5 296'),
    );
  };

  #drawPlatform: DrawFunc = (context) => {
    context.fillStyle = '#DFE0E3';
    context.fill(
      new Path2D('M303.666 104.664H264V209.855H303.666V104.664Z'),
    );
    context.fillStyle = '#EDEDED';
    context.fill(
      new Path2D('M316.537 74.1592H264V86.519H332.725L316.537 74.1592Z'),
    );
    context.fillStyle = '#EDEDED';
    context.fill(
      new Path2D('M264 102.561H305.767V118.076H339.912H339.916V92.0095L332.725 86.519H264V102.561Z'),
    );
    context.fillStyle = '#EDEDED';
    context.fill(
      new Path2D('M374.056 118.076L339.916 92.0095V118.076H374.056Z'),
    );
    context.fillStyle = '#EDEDED';
    context.fill(
      new Path2D('M305.767 118.076V149.37H336.239V123.599H339.916L339.912 118.076H305.767Z'),
    );
    context.fillStyle = '#EDEDED';
    context.fill(
      new Path2D('M381.289 123.599L374.056 118.076H339.916V123.599H381.289Z'),
    );
    context.fillStyle = '#EDEDED';
    context.fill(
      new Path2D('M305.767 180.664H339.916V162.519H336.239V149.37H305.767V180.664Z'),
    );
    context.fillStyle = '#EDEDED';
    context.fill(
      new Path2D('M305.767 212.484H339.916V180.664H305.767V212.484Z'),
    );
    context.fillStyle = '#EDEDED';
    context.fill(
      new Path2D('M339.916 212.484H392.454V180.664H339.916V212.484Z'),
    );
    context.fillStyle = '#EDEDED';
    context.fill(
      new Path2D('M392.454 212.484H446.042V180.664H392.454V212.484Z'),
    );
    context.fillStyle = '#EDEDED';
    context.fill(
      new Path2D('M392.454 180.664V149.37H389.039V162.519H339.916V180.664H392.454Z'),
    );
    context.fillStyle = '#EDEDED';
    context.fill(
      new Path2D('M392.454 149.37V180.664H446.042V173.038L415.043 149.37H392.454Z'),
    );
    context.fillStyle = '#EDEDED';
    context.fill(
      new Path2D('M392.454 132.123V149.37H415.043L392.454 132.123Z'),
    );
    context.fillStyle = '#EDEDED';
    context.fill(
      new Path2D('M392.454 132.123L389.039 129.515V149.37H392.454V132.123Z'),
    );
    context.fillStyle = '#FCFDFF';
    context.fill(
      new Path2D('M385.886 159.626V127.109L385.767 127.017H356.203V159.626H385.886Z'),
    );
    context.fillStyle = '#D7D7D7';
    context.fill(
      new Path2D('M339.916 159.626V127.017H356.203H385.767L381.289 123.599H339.916H336.239V149.37V162.519H339.916H389.039V149.37V129.515L385.886 127.109V159.626H356.203H339.916Z'),
    );
    context.fillStyle = '#F4F4F4';
    context.fill(
      new Path2D('M499.63 192.761V182.768H493.027H490.961H485.97V173.038H479.829H477.564H473.098H472.048V163.834H464.955H462.822H457.863V153.841H452.418H450.337H447.881H443.678V151.737V144.637H437.898H435.782H429.492V134.907H424.501H422.4H416.358V124.651H410.316H408.44H402.173V119.522V114.394H401.122H397.182H395.343H389.039V104.927H383.785H381.857H375.904V93.8824H371.176H369.123H362.77V89.0173V84.1523H357.254H355.152H348.848V74.1592H344.645H342.543H335.976V64.1661H332.824H330.985H323.63H322.054H313.385H311.809H303.14H301.564H292.37H290.531H281.6H279.761H270.83H268.991H264V74.1592H316.537L332.725 86.519L339.916 92.0095L374.056 118.076L381.289 123.599L385.767 127.017L385.886 127.109L389.039 129.515L392.454 132.123L415.043 149.37L446.042 173.038V180.664V212.484H502.519V192.761H499.63Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M334.4 15.5156H264V17.3564H268.991H270.83H279.761H281.6H290.531H292.37H301.564H303.14H311.809H313.385H322.054H323.63H330.985H332.824H334.4C335.432 17.626 336.386 18.0628 337.289 18.5977L340.179 20.6725C340.977 21.3195 341.757 21.9859 342.543 22.6089C343.16 23.0975 343.862 23.6501 344.645 24.2632C347.287 26.3331 350.849 29.0924 355.152 32.4067C355.834 32.9321 356.535 33.4714 357.254 34.0242C360.802 36.7534 364.787 39.8095 369.123 43.128C369.799 43.6452 370.483 44.1688 371.176 44.6985C374.554 47.282 378.127 50.0113 381.857 52.8581L382.683 53.488C383.049 53.7673 383.416 54.0477 383.785 54.3292C384.516 54.8866 385.252 55.4482 385.994 56.0138C387.018 56.7953 388.053 57.5844 389.098 58.3806C391.145 59.9409 393.228 61.5285 395.343 63.1392L397.182 64.5396C400.856 67.337 404.617 70.1998 408.44 73.1073L410.316 74.5344C414.294 77.5596 418.332 80.629 422.4 83.7196L424.501 85.3162C426.122 86.5476 427.747 87.7818 429.374 89.0173C431.508 90.6379 433.645 92.2606 435.782 93.8824L437.898 95.4891C441.237 98.0234 444.57 100.552 447.881 103.064L450.337 104.927L452.418 106.505C455.927 109.167 459.402 111.801 462.822 114.394L464.955 116.011C466.513 117.191 468.058 118.362 469.588 119.522L473.098 122.182C473.774 122.694 474.447 123.204 475.116 123.711C475.937 124.333 476.753 124.951 477.564 125.565L477.565 125.566C478.324 126.141 479.079 126.713 479.829 127.28C483.682 130.199 487.405 133.018 490.961 135.71L493.027 137.273C495.305 138.998 497.51 140.666 499.63 142.27C500.943 143.322 502.519 144.637 502.519 145.689V192.761V212.484V228H504.884V212.484V192.761V145.689C504.884 142.732 503.388 141.878 502.519 141.218L473.098 118.878L447.881 99.7289L433.774 89.0173L424.501 81.9766C413.734 73.8004 403.19 65.8021 393.401 58.3806L390.278 56.0138C363.323 35.581 342.735 20.0116 340.179 18.0807L337.289 16.5482C336.196 16.0933 335.063 15.6927 334.4 15.5156Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M270.83 17.3564H268.991V58.3806V60.4844V64.1661H270.83V60.4844V58.3806V17.3564Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M281.6 17.3564H279.761V58.3806V60.4844V64.1661H281.6V60.4844V58.3806V17.3564Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M292.37 17.3564H290.531V58.3806V60.4844V64.1661H292.37V60.4844V58.3806V17.3564Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M303.14 17.3564H301.564V58.3806V60.4844V64.1661H303.14V60.4844V58.3806V17.3564Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M313.385 17.3564H311.809V58.3806V60.4844V64.1661H313.385V60.4844V58.3806V17.3564Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M323.63 17.3564H322.054V58.3806V60.4844V64.1661H323.63V60.4844V58.3806V17.3564Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M332.824 17.3564H330.985V58.3806V60.4844V64.1661H332.824V60.4844V58.3806V17.3564Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M344.645 24.2632C343.862 23.6501 343.16 23.0975 342.543 22.6089V56.0138V58.3806V74.1592H344.645V58.3806V56.0138V24.2632Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M357.254 34.0242C356.535 33.4714 355.834 32.9321 355.152 32.4067V56.0138V58.3806V84.1523H357.254V58.3806V56.0138V34.0242Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M371.176 44.6985C370.483 44.1688 369.799 43.6452 369.123 43.128V56.0138V58.3806V89.0173V93.8824H371.176V89.0173V58.3806V56.0138V44.6985Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M382.683 53.488L381.857 52.8581V56.0138V58.3806V89.0173V104.927H383.785V89.0173V58.3806V56.0138V54.3292C383.416 54.0477 383.049 53.7673 382.683 53.488Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M397.182 64.5396L395.343 63.1392V89.0173V114.394H397.182V89.0173V64.5396Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M410.316 74.5344L408.44 73.1073V89.0173V119.522V124.651H410.316V119.522V89.0173V74.5344Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M424.501 85.3162L422.4 83.7196V89.0173V119.522V134.907H424.501V119.522V89.0173V85.3162Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M437.898 95.4891L435.782 93.8824V119.522V144.637H437.898V119.522V95.4891Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M452.418 106.505L450.337 104.927V119.522V151.737V153.841H452.418V151.737V119.522V106.505Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M464.955 116.011L462.822 114.394V119.522V151.737V163.834H464.955V151.737V119.522V116.011Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M477.564 125.565V173.038H479.829V127.28L477.565 125.566L477.564 125.565Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M490.961 135.71V182.768H493.027V137.273L490.961 135.71Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M335.976 64.1661V74.1592H342.543V58.3806H335.976V60.4844V64.1661Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M348.848 74.1592V84.1523H355.152V58.3806H344.645V74.1592H348.848Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M357.254 84.1523H362.77V89.0173H369.123V58.3806H357.254V84.1523Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M377.743 89.0173V58.3806H371.176V89.0173H377.743Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M377.743 58.3806V89.0173H381.857V58.3806H377.743Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M389.098 58.3806H383.785V89.0173H395.343V63.1392C393.228 61.5285 391.145 59.9409 389.098 58.3806Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M408.44 73.1073C404.617 70.1998 400.856 67.337 397.182 64.5396V89.0173H401.122H408.44V73.1073Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M422.4 83.7196C418.332 80.629 414.294 77.5596 410.316 74.5344V89.0173H422.4V83.7196Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M424.501 81.9766V58.3806H393.401C403.19 65.8021 413.734 73.8004 424.501 81.9766Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M473.098 89.0173V58.3806H424.501V81.9766L433.774 89.0173H447.881H473.098Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M362.77 93.8824H369.123V89.0173H362.77V93.8824Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M375.904 93.8824V104.927H381.857V89.0173H377.743H371.176V93.8824H375.904Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M389.039 104.927V114.394H395.343V89.0173H383.785V104.927H389.039Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M397.182 114.394H401.122V89.0173H397.182V114.394Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M402.173 114.394V119.522H408.44V89.0173H401.122V114.394H402.173Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M410.316 119.522H422.4V89.0173H410.316V119.522Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M424.501 119.522H435.782V93.8824C433.645 92.2606 431.508 90.6379 429.374 89.0173H424.501V119.522Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M424.501 85.3162V89.0173H429.374C427.747 87.7818 426.122 86.5476 424.501 85.3162Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M437.898 119.522H447.881V103.064C444.57 100.552 441.237 98.0234 437.898 95.4891V119.522Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M447.881 89.0173H433.774L447.881 99.7289V89.0173Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M473.098 89.0173H447.881V99.7289L473.098 118.878V89.0173Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M447.881 119.522H450.337V104.927L447.881 103.064V119.522Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M462.822 114.394C459.402 111.801 455.927 109.167 452.418 106.505V119.522H462.822V114.394Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M469.588 119.522C468.058 118.362 466.513 117.191 464.955 116.011V119.522H469.588Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M402.173 124.651H408.44V119.522H402.173V124.651Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M416.358 124.651V134.907H422.4V119.522H410.316V124.651H416.358Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M429.492 134.907V144.637H435.782V119.522H424.501V134.907H429.492Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M437.898 144.637H443.678V151.737H447.881H450.337V119.522H447.881H437.898V144.637Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M462.822 119.522H452.418V151.737H462.822V119.522Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M469.588 119.522H464.955V151.737H473.098V122.182L469.588 119.522Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M443.678 151.737V153.841H447.881V151.737H443.678Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M447.881 153.841H450.337V151.737H447.881V153.841Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M457.863 153.841V163.834H462.822V151.737H452.418V153.841H457.863Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M472.048 163.834V173.038H473.098V151.737H464.955V163.834H472.048Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M332.824 64.1661H335.976V60.4844H332.824V64.1661Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M323.63 64.1661H330.985V60.4844H323.63V64.1661Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M313.385 64.1661H322.054V60.4844H313.385V64.1661Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M303.14 64.1661H311.809V60.4844H303.14V64.1661Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M292.37 64.1661H301.564V60.4844H292.37V64.1661Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M281.6 64.1661H290.531V60.4844H281.6V64.1661Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M270.83 64.1661H279.761V60.4844H270.83V64.1661Z'),
    );
    context.fillStyle = '#fff';
    context.fill(
      new Path2D('M339.916 127.017V159.626H356.203V127.017H339.916Z'),
    );
    context.fillStyle = '#FBFBFB';
    context.fill(
      new Path2D('M528 212.484V202.491H512.239V192.761H504.884V212.484H528Z'),
    );
    context.fillStyle = '#DDDFE4';
    context.fill(
      new Path2D('M528 212.484H504.884V228H528V212.484Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M279.761 58.3806H270.83V60.4844H279.761V58.3806Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M290.531 58.3806H281.6V60.4844H290.531V58.3806Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M301.564 58.3806H292.37V60.4844H301.564V58.3806Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M311.809 58.3806H303.14V60.4844H311.809V58.3806Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M322.054 58.3806H313.385V60.4844H322.054V58.3806Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M330.985 58.3806H323.63V60.4844H330.985V58.3806Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M335.976 58.3806H332.824V60.4844H335.976V58.3806Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M335.976 56.0138V58.3806H342.543V56.0138H340.179H337.289H335.976Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M344.645 56.0138V58.3806H355.152V56.0138H344.645Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M357.254 56.0138V58.3806H369.123V56.0138H357.254Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M371.176 56.0138V58.3806H377.743H381.857V56.0138H371.176Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M383.785 56.0138V58.3806H389.098C388.053 57.5844 387.018 56.7953 385.994 56.0138H383.785Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M473.098 58.3806V56.0138H470.472H467.845H390.278L393.401 58.3806H424.501H473.098Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M341.755 0C337.972 0 337.202 2.98039 337.289 4.47059V16.5482L340.179 18.0807V5.25952C340.267 4.38293 340.862 2.62976 342.543 2.62976C344.224 2.62976 425.377 2.98039 465.743 3.15571C466.444 3.06805 467.845 3.31349 467.845 4.99654V56.0138H470.472V3.15571C470.472 1.0519 468.195 0.175317 467.057 0H341.755Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M337.289 56.0138H340.179V20.6725L337.289 18.5977V56.0138Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M224.334 104.664H264V209.855H224.334V104.664Z'),
    );
    context.fillStyle = '#F4F3F3';
    context.fill(
      new Path2D('M211.463 74.1592H264V86.519H195.275L211.463 74.1592Z'),
    );
    context.fillStyle = '#F4F3F3';
    context.fill(
      new Path2D('M264 102.561H222.233V118.076H188.088H188.084V92.0095L195.275 86.519H264V102.561Z'),
    );
    context.fillStyle = '#F4F3F3';
    context.fill(
      new Path2D('M153.943 118.076L188.084 92.0095V118.076H153.943Z'),
    );
    context.fillStyle = '#F4F3F3';
    context.fill(
      new Path2D('M222.233 118.076V149.37H191.761V123.599H188.084L188.088 118.076H222.233Z'),
    );
    context.fillStyle = '#F4F3F3';
    context.fill(
      new Path2D('M146.711 123.599L153.943 118.076H188.084V123.599H146.711Z'),
    );
    context.fillStyle = '#F4F3F3';
    context.fill(
      new Path2D('M222.233 180.664H188.084V162.519H191.761V149.37H222.233V180.664Z'),
    );
    context.fillStyle = '#F4F3F3';
    context.fill(
      new Path2D('M222.233 212.484H188.084V180.664H222.233V212.484Z'),
    );
    context.fillStyle = '#F4F3F3';
    context.fill(
      new Path2D('M188.084 212.484H135.546V180.664H188.084V212.484Z'),
    );
    context.fillStyle = '#F4F3F3';
    context.fill(
      new Path2D('M135.546 212.484H81.9583V180.664H135.546V212.484Z'),
    );
    context.fillStyle = '#F4F3F3';
    context.fill(
      new Path2D('M135.546 180.664V149.37H138.961V162.519H188.084V180.664H135.546Z'),
    );
    context.fillStyle = '#F4F3F3';
    context.fill(
      new Path2D('M135.546 149.37V180.664H81.9583V173.038L112.957 149.37H135.546Z'),
    );
    context.fillStyle = '#F4F3F3';
    context.fill(
      new Path2D('M135.546 132.123V149.37H112.957L135.546 132.123Z'),
    );
    context.fillStyle = '#F4F3F3';
    context.fill(
      new Path2D('M135.546 132.123L138.961 129.515V149.37H135.546V132.123Z'),
    );
    context.fillStyle = '#FCFDFF';
    context.fill(
      new Path2D('M142.114 159.626V127.109L142.233 127.017H171.797V159.626H142.114Z'),
    );
    context.fillStyle = '#D7D7D7';
    context.fill(
      new Path2D('M188.084 159.626V127.017H171.797H142.233L146.711 123.599H188.084H191.761V149.37V162.519H188.084H138.961V149.37V129.515L142.114 127.109V159.626H171.797H188.084Z'),
    );
    context.fillStyle = '#FBFBFB';
    context.fill(
      new Path2D('M28.3702 192.761V182.768H34.973H37.0388H42.0299V173.038H48.1715H50.4358H54.9015H55.9523V163.834H63.0448H65.1776H70.1373V153.841H75.5824H77.6627H80.1194H84.3224V151.737V144.637H90.1015H92.2183H98.5075V134.907H103.499H105.6H111.642V124.651H117.684H119.56H125.827V119.522V114.394H126.878H130.818H132.657H138.961V104.927H144.215H146.143H152.096V93.8824H156.824H158.877H165.23V89.0173V84.1523H170.746H172.848H179.152V74.1592H183.355H185.457H192.024V64.1661H195.176H197.015H204.37H205.946H214.615H216.191H224.86H226.436H235.63H237.469H246.4H248.239H257.17H259.009H264V74.1592H211.463L195.275 86.519L188.084 92.0095L153.943 118.076L146.711 123.599L142.233 127.017L142.114 127.109L138.961 129.515L135.546 132.123L112.957 149.37L81.9583 173.038V180.664V212.484H25.4806V192.761H28.3702Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M193.6 15.5156H264V17.3564H259.009H257.17H248.239H246.4H237.469H235.63H226.436H224.86H216.191H214.615H205.946H204.37H197.015H195.176H193.6C192.568 17.626 191.614 18.0628 190.711 18.5977L187.821 20.6725C187.023 21.3195 186.243 21.9859 185.457 22.6089C184.84 23.0975 184.138 23.6501 183.355 24.2632C180.713 26.3331 177.151 29.0924 172.848 32.4067C172.166 32.9321 171.465 33.4714 170.746 34.0242C167.198 36.7534 163.213 39.8095 158.877 43.128C158.201 43.6452 157.517 44.1688 156.824 44.6985C153.446 47.282 149.873 50.0113 146.143 52.8581L145.317 53.488C144.951 53.7673 144.584 54.0477 144.215 54.3292C143.484 54.8866 142.748 55.4482 142.006 56.0138C140.982 56.7953 139.947 57.5844 138.902 58.3806C136.855 59.9409 134.772 61.5285 132.657 63.1392L130.818 64.5396C127.144 67.337 123.383 70.1998 119.56 73.1073L117.684 74.5344C113.706 77.5596 109.668 80.629 105.6 83.7196L103.499 85.3162C101.878 86.5476 100.253 87.7818 98.6258 89.0173C96.4919 90.6379 94.3546 92.2606 92.2183 93.8824L90.1015 95.4891C86.7628 98.0234 83.4299 100.552 80.1194 103.064L77.6627 104.927L75.5824 106.505C72.0732 109.167 68.5982 111.801 65.1776 114.394L63.0448 116.011C61.4874 117.191 59.9424 118.362 58.4115 119.522L54.9015 122.182C54.2258 122.694 53.5533 123.204 52.8841 123.711C52.0629 124.333 51.2467 124.951 50.4358 125.565L50.4347 125.566C49.6755 126.141 48.921 126.713 48.1715 127.28C44.3177 130.199 40.5949 133.018 37.0388 135.71L34.973 137.273C32.6946 138.998 30.4903 140.666 28.3702 142.27C27.0567 143.322 25.4806 144.637 25.4806 145.689V192.761V212.484V228H23.1164V212.484V192.761V145.689C23.1164 142.732 24.6121 141.878 25.4806 141.218L54.9015 118.878L80.1194 99.7289L94.2262 89.0173L103.499 81.9766C114.266 73.8004 124.81 65.8021 134.599 58.3806L137.722 56.0138C164.677 35.581 185.265 20.0116 187.821 18.0807L190.711 16.5482C191.804 16.0933 192.937 15.6927 193.6 15.5156Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M257.17 17.3564H259.009V58.3806V60.4844V64.1661H257.17V60.4844V58.3806V17.3564Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M246.4 17.3564H248.239V58.3806V60.4844V64.1661H246.4V60.4844V58.3806V17.3564Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M235.63 17.3564H237.469V58.3806V60.4844V64.1661H235.63V60.4844V58.3806V17.3564Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M224.86 17.3564H226.436V58.3806V60.4844V64.1661H224.86V60.4844V58.3806V17.3564Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M214.615 17.3564H216.191V58.3806V60.4844V64.1661H214.615V60.4844V58.3806V17.3564Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M204.37 17.3564H205.946V58.3806V60.4844V64.1661H204.37V60.4844V58.3806V17.3564Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M195.176 17.3564H197.015V58.3806V60.4844V64.1661H195.176V60.4844V58.3806V17.3564Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M183.355 24.2632C184.138 23.6501 184.84 23.0975 185.457 22.6089V56.0138V58.3806V74.1592H183.355V58.3806V56.0138V24.2632Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M170.746 34.0242C171.465 33.4714 172.166 32.9321 172.848 32.4067V56.0138V58.3806V84.1523H170.746V58.3806V56.0138V34.0242Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M156.824 44.6985C157.517 44.1688 158.201 43.6452 158.877 43.128V56.0138V58.3806V89.0173V93.8824H156.824V89.0173V58.3806V56.0138V44.6985Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M145.317 53.488L146.143 52.8581V56.0138V58.3806V89.0173V104.927H144.215V89.0173V58.3806V56.0138V54.3292C144.584 54.0477 144.951 53.7673 145.317 53.488Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M130.818 64.5396L132.657 63.1392V89.0173V114.394H130.818V89.0173V64.5396Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M117.684 74.5344L119.56 73.1073V89.0173V119.522V124.651H117.684V119.522V89.0173V74.5344Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M103.499 85.3162L105.6 83.7196V89.0173V119.522V134.907H103.499V119.522V89.0173V85.3162Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M90.1015 95.4891L92.2183 93.8824V119.522V144.637H90.1015V119.522V95.4891Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M75.5824 106.505L77.6627 104.927V119.522V151.737V153.841H75.5824V151.737V119.522V106.505Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M63.0448 116.011L65.1776 114.394V119.522V151.737V163.834H63.0448V151.737V119.522V116.011Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M50.4358 125.565V173.038H48.1715V127.28L50.4347 125.566L50.4358 125.565Z'),
    );
    context.fillStyle = '#D3D3D3';
    context.fill(
      new Path2D('M37.0388 135.71V182.768H34.973V137.273L37.0388 135.71Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M192.024 64.1661V74.1592H185.457V58.3806H192.024V60.4844V64.1661Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M179.152 74.1592V84.1523H172.848V58.3806H183.355V74.1592H179.152Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M170.746 84.1523H165.23V89.0173H158.877V58.3806H170.746V84.1523Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M150.257 89.0173V58.3806H156.824V89.0173H150.257Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M150.257 58.3806V89.0173H146.143V58.3806H150.257Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M138.902 58.3806H144.215V89.0173H132.657V63.1392C134.772 61.5285 136.855 59.9409 138.902 58.3806Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M119.56 73.1073C123.383 70.1998 127.144 67.337 130.818 64.5396V89.0173H126.878H119.56V73.1073Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M105.6 83.7196C109.668 80.629 113.706 77.5596 117.684 74.5344V89.0173H105.6V83.7196Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M103.499 81.9766V58.3806H134.599C124.81 65.8021 114.266 73.8004 103.499 81.9766Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M54.9015 89.0173V58.3806H103.499V81.9766L94.2262 89.0173H80.1194H54.9015Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M165.23 93.8824H158.877V89.0173H165.23V93.8824Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M152.096 93.8824V104.927H146.143V89.0173H150.257H156.824V93.8824H152.096Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M138.961 104.927V114.394H132.657V89.0173H144.215V104.927H138.961Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M130.818 114.394H126.878V89.0173H130.818V114.394Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M125.827 114.394V119.522H119.56V89.0173H126.878V114.394H125.827Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M117.684 119.522H105.6V89.0173H117.684V119.522Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M103.499 119.522H92.2183V93.8824C94.3546 92.2606 96.4919 90.6379 98.6258 89.0173H103.499V119.522Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M103.499 85.3162V89.0173H98.6258C100.253 87.7818 101.878 86.5476 103.499 85.3162Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M90.1015 119.522H80.1194V103.064C83.4299 100.552 86.7628 98.0234 90.1015 95.4891V119.522Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M80.1194 89.0173H94.2262L80.1194 99.7289V89.0173Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M54.9015 89.0173H80.1194V99.7289L54.9015 118.878V89.0173Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M80.1194 119.522H77.6627V104.927L80.1194 103.064V119.522Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M65.1776 114.394C68.5982 111.801 72.0732 109.167 75.5824 106.505V119.522H65.1776V114.394Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M58.4115 119.522C59.9424 118.362 61.4874 117.191 63.0448 116.011V119.522H58.4115Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M125.827 124.651H119.56V119.522H125.827V124.651Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M111.642 124.651V134.907H105.6V119.522H117.684V124.651H111.642Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M98.5075 134.907V144.637H92.2183V119.522H103.499V134.907H98.5075Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M90.1015 144.637H84.3224V151.737H80.1194H77.6627V119.522H80.1194H90.1015V144.637Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M65.1776 119.522H75.5824V151.737H65.1776V119.522Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M58.4115 119.522H63.0448V151.737H54.9015V122.182L58.4115 119.522Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M84.3224 151.737V153.841H80.1194V151.737H84.3224Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M80.1194 153.841H77.6627V151.737H80.1194V153.841Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M70.1373 153.841V163.834H65.1776V151.737H75.5824V153.841H70.1373Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M55.9523 163.834V173.038H54.9015V151.737H63.0448V163.834H55.9523Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M195.176 64.1661H192.024V60.4844H195.176V64.1661Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M204.37 64.1661H197.015V60.4844H204.37V64.1661Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M214.615 64.1661H205.946V60.4844H214.615V64.1661Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M224.86 64.1661H216.191V60.4844H224.86V64.1661Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M235.63 64.1661H226.436V60.4844H235.63V64.1661Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M246.4 64.1661H237.469V60.4844H246.4V64.1661Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M257.17 64.1661H248.239V60.4844H257.17V64.1661Z'),
    );
    context.fillStyle = '#fff';
    context.fill(
      new Path2D('M188.084 127.017V159.626H171.797V127.017H188.084Z'),
    );
    context.fillStyle = '#FBFBFB';
    context.fill(
      new Path2D('M0 212.484V202.491H15.7612V192.761H23.1164V212.484H0Z'),
    );
    context.fillStyle = '#DDDFE4';
    context.fill(
      new Path2D('M0 212.484H23.1164V228H0V212.484Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M248.239 58.3806H257.17V60.4844H248.239V58.3806Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M237.469 58.3806H246.4V60.4844H237.469V58.3806Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M226.436 58.3806H235.63V60.4844H226.436V58.3806Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M216.191 58.3806H224.86V60.4844H216.191V58.3806Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M205.946 58.3806H214.615V60.4844H205.946V58.3806Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M197.015 58.3806H204.37V60.4844H197.015V58.3806Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M192.024 58.3806H195.176V60.4844H192.024V58.3806Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M192.024 56.0138V58.3806H185.457V56.0138H187.821H190.711H192.024Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M183.355 56.0138V58.3806H172.848V56.0138H183.355Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M170.746 56.0138V58.3806H158.877V56.0138H170.746Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M156.824 56.0138V58.3806H150.257H146.143V56.0138H156.824Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M144.215 56.0138V58.3806H138.902C139.947 57.5844 140.982 56.7953 142.006 56.0138H144.215Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M54.9015 58.3806V56.0138H57.5284H60.1553H137.722L134.599 58.3806H103.499H54.9015Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M186.245 0C190.028 0 190.798 2.98039 190.711 4.47059V16.5482L187.821 18.0807V5.25952C187.733 4.38293 187.138 2.62976 185.457 2.62976C183.776 2.62976 102.623 2.98039 62.2567 3.15571C61.5562 3.06805 60.1553 3.31349 60.1553 4.99654V56.0138H57.5284V3.15571C57.5284 1.0519 59.805 0.175317 60.9433 0H186.245Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M190.711 56.0138H187.821V20.6725L190.711 18.5977V56.0138Z'),
    );
    context.fillStyle = '#E3E5EB';
    context.fill(
      new Path2D('M268.991 58.3806H259.009V60.4844H268.991V58.3806Z'),
    );
    context.fillStyle = '#F0F2F5';
    context.fill(
      new Path2D('M264 64.1661H268.991V60.4844H259.009V64.1661H264Z'),
    );
    context.fillStyle = '#CECFD2';
    context.fill(
      new Path2D('M264 104.664H303.666V209.855H264V212.484H305.767V180.664V149.37V118.076V102.561H264H222.233V118.076V149.37V180.664V212.484H264V209.855H224.334V104.664H264Z'),
    );
    context.fillStyle = '#DDDFE5';
    context.fill(
      new Path2D('M502.519 212.484H446.042H392.454H339.916H305.767H264H222.233H188.084H135.546H81.9583H25.4806V228H502.519V212.484Z'),
    );
  };
}
