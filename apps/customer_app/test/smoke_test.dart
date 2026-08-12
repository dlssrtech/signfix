import 'package:flutter_test/flutter_test.dart';
import 'package:signfix_customer/main.dart';

void main() {
  testWidgets('customer application starts', (tester) async {
    await tester.pumpWidget(const SignFixCustomerApp());
    expect(find.byType(SignFixCustomerApp), findsOneWidget);
  });
}
