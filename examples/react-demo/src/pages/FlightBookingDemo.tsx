/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-11-27
 * @Description: 机票预定演示页面
 * Copyright (c) 2025 by bytedesk.com, All Rights Reserved.
 */
import { useEffect, useMemo, useState } from 'react';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig, Language, Theme } from '@bytedesk/web/types';
import PageContainer from '../components/PageContainer';
import { getLocaleMessages } from '../locales';
import { Button, Card, Col, Descriptions, Divider, Row, Space, Steps, Tag, Typography, theme } from 'antd';

interface FlightBookingDemoProps {
  locale: Language;
  themeMode: Theme['mode'];
}

interface FlightInfo {
  flightNo: string;
  airline: string;
  departure: {
    city: string;
    airport: string;
    time: string;
  };
  arrival: {
    city: string;
    airport: string;
    time: string;
  };
  date: string;
  duration: string;
  price: number;
  currency: string;
  cabinClass: string;
  aircraft: string;
  status: 'scheduled' | 'boarding' | 'departed' | 'arrived' | 'cancelled';
}

interface PassengerInfo {
  name: string;
  idType: string;
  idNumber: string;
  phone: string;
  email: string;
}

interface BookingInfo {
  bookingNo: string;
  bookingTime: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentMethod: string;
  totalAmount: number;
  flight: FlightInfo;
  passengers: PassengerInfo[];
}

const FlightBookingDemo = ({ locale, themeMode }: FlightBookingDemoProps) => {
  const messages = useMemo(() => getLocaleMessages(locale), [locale]);
  const { token } = theme.useToken();
  const pageMessages = messages.pages.flightBookingDemo;

  // 示例订单数据
  const bookingData: BookingInfo = {
    bookingNo: 'BK20251127001',
    bookingTime: '2025-11-27 10:30:00',
    paymentStatus: 'paid',
    paymentMethod: pageMessages.booking.paymentMethods.alipay,
    totalAmount: 2580,
    flight: {
      flightNo: 'CA1234',
      airline: pageMessages.flight.airlines.airChina,
      departure: {
        city: pageMessages.flight.cities.beijing,
        airport: pageMessages.flight.airports.pek,
        time: '08:30'
      },
      arrival: {
        city: pageMessages.flight.cities.shanghai,
        airport: pageMessages.flight.airports.pvg,
        time: '10:50'
      },
      date: '2025-12-15',
      duration: '2h 20min',
      price: 1290,
      currency: 'CNY',
      cabinClass: pageMessages.flight.cabinClasses.economy,
      aircraft: 'Boeing 737-800',
      status: 'scheduled'
    },
    passengers: [
      {
        name: pageMessages.passenger.samplePassenger1,
        idType: pageMessages.passenger.idTypes.idCard,
        idNumber: '310***********1234',
        phone: '138****8888',
        email: 'zhang***@example.com'
      },
      {
        name: pageMessages.passenger.samplePassenger2,
        idType: pageMessages.passenger.idTypes.idCard,
        idNumber: '310***********5678',
        phone: '139****9999',
        email: 'li***@example.com'
      }
    ]
  };

  const [config, setConfig] = useState<BytedeskConfig>(() => ({
    isDebug: false,
    ...(process.env.NODE_ENV === 'development'
      ? {
        htmlUrl: 'http://127.0.0.1:9006',
        apiUrl: 'http://127.0.0.1:9003'
      }
      : {}),
    placement: 'bottom-right',
    marginBottom: 20,
    marginSide: 20,
    autoPopup: false,
    draggable: true,
    bubbleConfig: {
      show: true,
      icon: '✈️',
      title: pageMessages.bubbleTitle,
      subtitle: pageMessages.bubbleSubtitle
    },
    buttonConfig: {
      show: true,
      width: 60,
      height: 60
    },
    chatConfig: {
      org: 'df_org_uid',
      t: '2',
      sid: 'df_rt_uid',
      extra: JSON.stringify({
        type: 'flight_booking',
        bookingNo: bookingData.bookingNo,
        flightNo: bookingData.flight.flightNo,
        route: `${bookingData.flight.departure.city} → ${bookingData.flight.arrival.city}`,
        date: bookingData.flight.date,
        passengers: bookingData.passengers.length,
        totalAmount: bookingData.totalAmount
      })
    },
    theme: {
      mode: themeMode || 'light',
      textColor: '#ffffff',
      backgroundColor: '#0066ff'
    },
    locale
  }));

  useEffect(() => {
    setConfig((prevConfig: BytedeskConfig) => ({
      ...prevConfig,
      locale,
      theme: {
        ...prevConfig.theme,
        mode: themeMode || prevConfig.theme?.mode
      },
      bubbleConfig: {
        ...prevConfig.bubbleConfig,
        title: pageMessages.bubbleTitle,
        subtitle: pageMessages.bubbleSubtitle
      }
    }));
  }, [locale, themeMode, pageMessages]);

  const handleInit = () => {
    console.log('BytedeskReact initialized FlightBookingDemo');
  };

  const handleContactSupport = () => {
    (window as any).bytedesk?.showChat();
  };

  const getStatusStep = (status: FlightInfo['status']) => {
    const statusMap = {
      scheduled: 0,
      boarding: 1,
      departed: 2,
      arrived: 3,
      cancelled: -1
    };
    return statusMap[status];
  };

  const getStatusColor = (status: FlightInfo['status']) => {
    const colorMap = {
      scheduled: 'blue',
      boarding: 'orange',
      departed: 'cyan',
      arrived: 'green',
      cancelled: 'red'
    };
    return colorMap[status];
  };

  const getPaymentStatusColor = (status: BookingInfo['paymentStatus']) => {
    const colorMap = {
      pending: 'orange',
      paid: 'green',
      refunded: 'red'
    };
    return colorMap[status];
  };

  const docLinks = [
    { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/channel/react', label: messages.common.docLinks.react },
    { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/channel/vue', label: messages.common.docLinks.vue }
  ];

  return (
    <PageContainer>
      <Card>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Title level={2} style={{ marginBottom: 0 }}>
            {pageMessages.title}
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {pageMessages.description}
          </Typography.Paragraph>
          <Space direction="vertical" size={4}>
            {docLinks.map((link) => (
              <Typography.Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </Typography.Link>
            ))}
          </Space>
        </Space>
      </Card>

      {/* 航班状态时间线 */}
      <Card title={pageMessages.sections.flightStatus} style={{ marginTop: 16 }}>
        <Steps
          current={getStatusStep(bookingData.flight.status)}
          items={[
            { title: pageMessages.statusText.scheduled },
            { title: pageMessages.statusText.boarding },
            { title: pageMessages.statusText.departed },
            { title: pageMessages.statusText.arrived }
          ]}
        />
      </Card>

      {/* 航班信息卡片 */}
      <Card title={pageMessages.sections.flightInfo} style={{ marginTop: 16 }}>
        <Row gutter={[24, 16]}>
          <Col xs={24} md={8}>
            <div style={{ textAlign: 'center' }}>
              <Typography.Text type="secondary">{pageMessages.labels.departure}</Typography.Text>
              <Typography.Title level={3} style={{ margin: '8px 0' }}>
                {bookingData.flight.departure.time}
              </Typography.Title>
              <Typography.Text strong>{bookingData.flight.departure.city}</Typography.Text>
              <br />
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                {bookingData.flight.departure.airport}
              </Typography.Text>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div style={{ textAlign: 'center' }}>
              <Typography.Text type="secondary">{bookingData.flight.duration}</Typography.Text>
              <div style={{ 
                margin: '12px 0', 
                borderTop: `2px dashed ${token.colorBorder}`,
                position: 'relative'
              }}>
                <span style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: 20,
                  background: token.colorBgContainer,
                  padding: '0 8px'
                }}>✈️</span>
              </div>
              <Tag color="blue">{bookingData.flight.flightNo}</Tag>
              <br />
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                {bookingData.flight.airline} · {bookingData.flight.aircraft}
              </Typography.Text>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div style={{ textAlign: 'center' }}>
              <Typography.Text type="secondary">{pageMessages.labels.arrival}</Typography.Text>
              <Typography.Title level={3} style={{ margin: '8px 0' }}>
                {bookingData.flight.arrival.time}
              </Typography.Title>
              <Typography.Text strong>{bookingData.flight.arrival.city}</Typography.Text>
              <br />
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                {bookingData.flight.arrival.airport}
              </Typography.Text>
            </div>
          </Col>
        </Row>
        <Divider />
        <Row gutter={[16, 8]}>
          <Col span={12}>
            <Typography.Text type="secondary">{pageMessages.labels.flightDate}：</Typography.Text>
            <Typography.Text strong>{bookingData.flight.date}</Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text type="secondary">{pageMessages.labels.cabinClass}：</Typography.Text>
            <Typography.Text strong>{bookingData.flight.cabinClass}</Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text type="secondary">{pageMessages.labels.flightStatus}：</Typography.Text>
            <Tag color={getStatusColor(bookingData.flight.status)}>
              {pageMessages.statusText[bookingData.flight.status]}
            </Tag>
          </Col>
          <Col span={12}>
            <Typography.Text type="secondary">{pageMessages.labels.ticketPrice}：</Typography.Text>
            <Typography.Text strong style={{ color: token.colorError }}>
              ¥{bookingData.flight.price}/{pageMessages.labels.perPerson}
            </Typography.Text>
          </Col>
        </Row>
      </Card>

      {/* 订单信息 */}
      <Card title={pageMessages.sections.bookingInfo} style={{ marginTop: 16 }}>
        <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
          <Descriptions.Item label={pageMessages.labels.bookingNo}>
            <Typography.Text copyable>{bookingData.bookingNo}</Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label={pageMessages.labels.bookingTime}>
            {bookingData.bookingTime}
          </Descriptions.Item>
          <Descriptions.Item label={pageMessages.labels.paymentStatus}>
            <Tag color={getPaymentStatusColor(bookingData.paymentStatus)}>
              {pageMessages.paymentStatusText[bookingData.paymentStatus]}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label={pageMessages.labels.paymentMethod}>
            {bookingData.paymentMethod}
          </Descriptions.Item>
          <Descriptions.Item label={pageMessages.labels.passengerCount}>
            {bookingData.passengers.length} {pageMessages.labels.person}
          </Descriptions.Item>
          <Descriptions.Item label={pageMessages.labels.totalAmount}>
            <Typography.Text strong style={{ color: token.colorError, fontSize: 18 }}>
              ¥{bookingData.totalAmount}
            </Typography.Text>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 乘客信息 */}
      <Card title={pageMessages.sections.passengerInfo} style={{ marginTop: 16 }}>
        {bookingData.passengers.map((passenger, index) => (
          <div key={index} style={{ marginBottom: index < bookingData.passengers.length - 1 ? 16 : 0 }}>
            <Typography.Text strong style={{ marginBottom: 8, display: 'block' }}>
              {pageMessages.labels.passenger} {index + 1}
            </Typography.Text>
            <Descriptions column={{ xs: 1, sm: 2 }} size="small">
              <Descriptions.Item label={pageMessages.labels.passengerName}>
                {passenger.name}
              </Descriptions.Item>
              <Descriptions.Item label={pageMessages.labels.idType}>
                {passenger.idType}
              </Descriptions.Item>
              <Descriptions.Item label={pageMessages.labels.idNumber}>
                {passenger.idNumber}
              </Descriptions.Item>
              <Descriptions.Item label={pageMessages.labels.phone}>
                {passenger.phone}
              </Descriptions.Item>
            </Descriptions>
            {index < bookingData.passengers.length - 1 && <Divider style={{ margin: '12px 0' }} />}
          </div>
        ))}
      </Card>

      {/* 操作按钮 */}
      <Card style={{ marginTop: 16 }}>
        <Space wrap>
          <Button type="primary" icon={<span>💬</span>} onClick={handleContactSupport}>
            {pageMessages.buttons.contactSupport}
          </Button>
          <Button icon={<span>📋</span>}>
            {pageMessages.buttons.viewItinerary}
          </Button>
          <Button icon={<span>🔄</span>}>
            {pageMessages.buttons.changeBooking}
          </Button>
          <Button danger icon={<span>❌</span>}>
            {pageMessages.buttons.cancelBooking}
          </Button>
        </Space>
      </Card>

      <BytedeskReact {...config} onInit={handleInit} />
    </PageContainer>
  );
};

export default FlightBookingDemo;
